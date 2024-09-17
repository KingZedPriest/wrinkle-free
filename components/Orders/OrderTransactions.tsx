'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

//Utils
import { makeApiRequest } from '@/lib/apiUtils';

//Components
import { Button } from '../ui/button';
import TransactionDetails from '../Dashboard/TransactionDetails';


const OrderTransactions = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [transactions, setTransactions] = useState<OrderTransaction[]>([]);
    const [totalPages, setTotalPages] = useState(1)

    //Params
    const page = parseInt((searchParams.get('page')) || "1");
    const limit = parseInt((searchParams.get('limit')) || "20");

    //Functions
    const updatePage = (newPage: number, type: "add" | "remove") => {
        let newLimit: number;
        if (type === "add") {
            newLimit = limit + 20
        } else {
            newLimit = limit - 20
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        params.set('limit', newLimit.toString());
        // Replace the current URL with the updated query parameters
        router.replace(`?${params.toString()}`);
    };

    useEffect(() => {

        makeApiRequest(`/getTransactions?page=${page}&limit=${limit}`, "get", "", {
            onSuccess: (response) => {
                setTransactions(response.data.orderTransactions);
                setTotalPages(response.data.totalPages);
            },
            onError: (error: any) => {
                console.error('Error loading orders:', error);
            },
        });
    }, [limit, page]);

    return (
        <main className='mt-5'>
            {transactions.length === 0 &&
                <div className='h-dvh flex items-center justify-center'>
                    <p>You don&apos;t have transactions yet.</p>
                </div>
            }
            {transactions.map((order, index) => (
                <TransactionDetails key={`Order-${index}`} orderId={order.orderId} clientName={order.clientName} createdAt={order.createdAt} paidAmount={order.amountPaid} />
            ))}
            <div className="mt-4 flex justify-between">
                <Button onClick={() => updatePage((page - 1), "remove")} disabled={page === 1 || transactions.length === 0}>
                    Previous
                </Button>
                <span>Page {page} of {totalPages}</span>
                <Button onClick={() => updatePage((page + 1), "add")} disabled={page === totalPages || transactions.length === 0}>
                    Next
                </Button>
            </div>
        </main>
    );
}

export default OrderTransactions;