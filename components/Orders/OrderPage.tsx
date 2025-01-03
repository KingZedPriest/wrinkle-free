'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { toast } from 'sonner';

//Server Actions
import { editOrder } from '@/actions/server/editOrder';

//Components
import MainOrderTable from './MainOrderTable';
import DateRangeSelect from './DateRangeSelect';
import SelectDate from '../Dashboard/SelectDate';
import { Button } from "@/components/ui/button";
import Fallback from '../Fallback';

//Utils
import { makeApiRequest } from '@/lib/apiUtils';

export default function OrderPage() {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const [orders, setOrders] = useState<MainOrder[]>([]);

    const today = dayjs().format('YYYY-MM-DD');
    
    //Params
    const startDate = searchParams.get('startDate') || today;
    const endDate = searchParams.get('endDate');
    const currentPage = parseInt(searchParams.get('page') || '1');

    const [totalPages, setTotalPages] = useState(1)

    //Functions
    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());

        // Replace the current URL with the updated query parameters
        router.replace(`?${params.toString()}`);
    };

    const handleDateRangeChange = (start: Date, end: Date) => {

        const params = new URLSearchParams(searchParams);
        params.set('startDate', start.toDateString());
        params.set('endDate', end.toDateString());
        params.set('page', "1")

        // Push the new URL with updated query parameters
        router.push(`?${params.toString()}`);
    }

    const handleSingleDateChange = (date: Date) => {

        const params = new URLSearchParams(searchParams);
        params.set('startDate', date.toDateString());
        params.set('endDate', "");
        params.set('page', "1")

        // Push the new URL with updated query parameters
        router.push(`?${params.toString()}`);
    }

    const handleEdit = async (id: string, data: EditingProps) => {
        toast.message("Updating...")
        const { success, message } = await editOrder(id, data.price, data.service, data.quantity, data.status)
        if (success) {
            toast.success(message);
            window.location.reload()
        } else {
            toast.error("Order could not be updated now, kindly try again later");
            window.location.reload()
        }
    }

    const handleDelete = async (orderId: string) => {
        toast.message("Deleting Order(s)...")
        setLoading(true)

        const formData = { orderId };

        await makeApiRequest("/deleteOrder", "delete", formData, {
            onSuccess: () => {
                toast.success(`The Order was deleted successfully.`);
                setLoading(false);
                window.location.reload();
            },
            onError: () => {
                toast.error("Couldn't delete order now, please try again later.");
                setLoading(false);
                window.location.reload();
            },
        });
    }

    useEffect(() => {

        makeApiRequest(`/getOrders?startDate=${startDate}&page=${currentPage}&pageSize=20&endDate=${endDate}`, "get", "", {
            onSuccess: (response) => {
                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
            },
            onError: (error: any) => {
                console.error('Error loading orders:', error);
            },
        });
    }, [startDate, endDate, currentPage]);

    return (
        <main className='mt-5'>
            <div className="flex sm:flex-row flex-col gap-y-5 sm:gap-x-5 md:gap-x-10 mb-4">
                <DateRangeSelect onDateRangeSelect={handleDateRangeChange} />
                <SelectDate onDateSelect={handleSingleDateChange} />
            </div>
            <Suspense fallback={<Fallback />}>
                <MainOrderTable orders={orders} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
            </Suspense>
            <div className="flex justify-between mt-4">
                <Button onClick={() => updatePage((currentPage - 1))} disabled={currentPage === 1 || orders.length === 0}>
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={() => updatePage((currentPage + 1))} disabled={currentPage === totalPages || orders.length === 0}>
                    Next
                </Button>
            </div>
        </main>
    )
}