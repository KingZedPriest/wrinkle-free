'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

//Utils
import { makeApiRequest } from '@/lib/apiUtils';

//Components
import { Button } from '../ui/button';
import TransactionDetails from '../Dashboard/TransactionDetails';
import Fallback from '../Fallback';


const OrderTransactions = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [transactions, setTransactions] = useState<OrderTransaction[]>([]);
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState<boolean>(false)

    //Params
    const page = parseInt((searchParams.get('page')) || "1");
    const limit = parseInt((searchParams.get('limit')) || "20");

    //Functions
    const updatePage = (newPage: number) => {
        
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        // Replace the current URL with the updated query parameters
        router.replace(`?${params.toString()}`);
    };

    useEffect(() => {
        setLoading(true);
        makeApiRequest(`/getTransactions?page=${page}&limit=${limit}`, "get", "", {
            onSuccess: (response) => {
                setTransactions(response.data.orderTransactions);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            },
            onError: (error: any) => {
                console.error('Error loading orders:', error);
                setLoading(false);
            },
        });
    }, [limit, page]);

    return (
        <main className='mt-5'>
            {loading &&
                <div className='flex justify-center items-center h-dvh'>
                    <Fallback />
                </div>
            }
            {transactions.length === 0 &&
                <div className='flex justify-center items-center h-dvh'>
                    <p>You don&apos;t have transactions yet.</p>
                </div>
            }
            {transactions.map((order, index) => (
                <TransactionDetails key={`Order-${index}`} orderId={order.orderId} clientName={order.clientName} createdAt={order.createdAt} paidAmount={order.amountPaid} />
            ))}
            <div className="flex justify-between mt-4">
                <Button onClick={() => updatePage(page - 1)} disabled={page === 1 || transactions.length === 0}>
                    Previous
                </Button>
                <span>Page {page} of {totalPages}</span>
                <Button onClick={() => updatePage(page + 1)} disabled={page === totalPages || transactions.length === 0}>
                    Next
                </Button>
            </div>
        </main>
    );
}

export default OrderTransactions;