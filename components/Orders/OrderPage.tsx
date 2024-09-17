'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { toast } from 'sonner';

//Server Actions
import { deleteOrder } from '@/actions/server/deleteOrder';
import { editOrder } from '@/actions/server/editOrder';

//Components
import MainOrderTable from './MainOrderTable';
import DateRangeSelect from './DateRangeSelect';
import SelectDate from '../Dashboard/SelectDate';
import { Button } from "@/components/ui/button";

//Utils
import { makeApiRequest } from '@/lib/apiUtils';

//Icons
import { ChartCircle } from 'iconsax-react';

export default function OrderPage() {

    const router = useRouter();
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [orders, setOrders] = useState<MainOrder[]>([])



    const today = dayjs().format('YYYY-MM-DD');
    //Params
    const startDate = searchParams.get('startDate') || today;
    const endDate = searchParams.get('endDate') || today;
    const currentPage = parseInt(searchParams.get('currentPage') || '1');

    const [totalPages, setTotalPages] = useState(1)

    //Functions
    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());

        // Replace the current URL with the updated query parameters
        router.replace(`?${params.toString()}`);
    };


    useEffect(() => {
        setLoading(true);

        makeApiRequest(`/getOrders?startDate=${startDate}&page=${currentPage}&pageSize=20&endDate=${endDate}`, "get", "", {
            onSuccess: (response) => {
                setLoading(false);
                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
            },
            onError: (error: any) => {
                setLoading(false);
                console.error('Error loading orders:', error);
            },
        });
    }, [startDate, endDate, currentPage]);


    const handleDateRangeChange = (start: Date, end: Date) => {

        const params = new URLSearchParams(searchParams);
        params.set('startDate', start.toDateString());
        params.set('endDate', end.toDateString());
        params.set('currentPage', "1")

        // Push the new URL with updated query parameters
        router.push(`?${params.toString()}`);
    }

    const handleSingleDateChange = (date: Date) => {

        const params = new URLSearchParams(searchParams);
        params.set('startDate', date.toDateString());
        params.set('endDate', "");
        params.set('currentPage', "1")

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

    const handleDelete = async (id: string) => {
        toast.message("Deleting Order...")
        const { success, message } = await deleteOrder(id)
        if (success) {
            toast.success(message);
            window.location.reload()
        } else {
            toast.error("Order could not be deleted, kindly try again later");
            window.location.reload()
        }
    }

    return (
        <main className='mt-5'>
            <div className="flex flex-col gap-y-5 sm:flex-row sm:gap-x-5 md:gap-x-10 mb-4">
                <DateRangeSelect onDateRangeSelect={handleDateRangeChange} />
                <SelectDate onDateSelect={handleSingleDateChange} />
            </div>
            <MainOrderTable orders={orders} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="mt-4 flex justify-between">
                <Button onClick={() => updatePage((currentPage - 1))} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={() => updatePage((currentPage + 1))} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
            {loading &&
                <div className={`fixed inset-0 bg-black/90 z-20 flex items-center justify-center h-dvh`}><ChartCircle size="40" className="text-textOrange animate-spin" /></div>
            }
        </main>
    )
}