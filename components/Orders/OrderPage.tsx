'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

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

    //Params
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
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
                setOrders(response.data.orders); // Ensure this matches the structure of the response
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

    const handleEdit = async (id: string, data: Partial<MainOrder>) => {
        // Implement your edit logic here
        console.log('Editing order:', id, data)
    }

    const handleDelete = async (id: string) => {
        // Implement your delete logic here
        console.log('Deleting order:', id)
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
                <div className={`fixed inset-0 bg-black/90 z-20 flex items-center justify-center`}><ChartCircle size="40" className="text-generalBlue dark:text-cloudBlue animate-spin" /></div>
            }
        </main>
    )
}