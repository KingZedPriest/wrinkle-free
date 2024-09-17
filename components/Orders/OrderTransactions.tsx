'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { toast } from 'sonner';

//Utils
import { makeApiRequest } from '@/lib/apiUtils';


const OrderTransactions = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<[]>([]);
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
                setTransactions(response.data.orders);
                setTotalPages(response.data.totalPages);
            },
            onError: (error: any) => {
                console.error('Error loading orders:', error);
            },
        });
    }, [limit, page]);

    return (
        <main>

        </main>
    );
}

export default OrderTransactions;