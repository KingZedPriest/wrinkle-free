'use client'

import { useState, useEffect } from 'react';

//Server Actions
import { orderService } from '@/actions/fetch/orderService';

//Components
import MainOrderTable from './MainOrderTable';
import DateRangeSelect from './DateRangeSelect';
import SelectDate from '../Dashboard/SelectDate';
import { Button } from "@/components/ui/button";

export default function OrderPage() {

    const [orders, setOrders] = useState<MainOrder[]>([])
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [singleDate, setSingleDate] = useState<Date | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const loadOrders = async () => {
        try {
            const result = await orderService( singleDate || startDate, endDate, currentPage )
            setOrders(result.orders)
            setTotalPages(result.totalPages)
        } catch (error) {
            console.error('Error loading orders:', error)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [startDate, endDate, singleDate, currentPage])

    const handleDateRangeChange = (start: Date, end: Date) => {
        setStartDate(start)
        setEndDate(end)
        setSingleDate(null)
        setCurrentPage(1)
    }

    const handleSingleDateChange = (date: Date) => {
        setSingleDate(date)
        setStartDate(null)
        setEndDate(null)
        setCurrentPage(1)
    }

    const handleEdit = async (id: string, data: Partial<MainOrder>) => {
        // Implement your edit logic here
        console.log('Editing order:', id, data)
        await loadOrders()
    }

    const handleDelete = async (id: string) => {
        // Implement your delete logic here
        console.log('Deleting order:', id)
        await loadOrders()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div className="flex space-x-4 mb-4">
                <DateRangeSelect onDateRangeSelect={handleDateRangeChange} />
                <SelectDate onDateSelect={handleSingleDateChange} />
            </div>
            <MainOrderTable orders={orders} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="mt-4 flex justify-between">
                <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </div>
    )
}