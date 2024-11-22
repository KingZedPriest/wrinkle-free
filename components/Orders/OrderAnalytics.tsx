'use client'

import { useState, useEffect } from 'react';

//Utils
import formatAmount from '@/lib/formatAmount';

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const periods = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'alltime', label: 'All Time' },
]

export default function OrderAnalytics() {

    const [paidAmount, setPaidAmount] = useState<number | null>(null)
    const [chargedAmount, setChargedAmount] = useState<number | null>(null)
    const [paidPeriod, setPaidPeriod] = useState('today')
    const [chargedPeriod, setChargedPeriod] = useState('today')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async (type: 'paid' | 'charged', period: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`/api/order-analytics?type=${type}&period=${period}`)
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await response.json()
            if (type === 'paid') {
                setPaidAmount(data.total)
            } else {
                setChargedAmount(data.total)
            }
        } catch (err) {
            setError('An error occurred while fetching data')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData('paid', paidPeriod)
        fetchData('charged', chargedPeriod)
    }, [paidPeriod, chargedPeriod])

    const handlePeriodChange = (type: 'paid' | 'charged', value: string) => {
        if (type === 'paid') {
            setPaidPeriod(value)
        } else {
            setChargedPeriod(value)
        }
    }


    return (
        <div className="gap-4 grid md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Total Paid Amount</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 font-bold text-2xl">{formatAmount(paidAmount)}</div>
                    <div className='flex flex-wrap gap-3'>
                        {periods.map((period) => (
                            <div className={`${paidPeriod === period.value ? "dark:bg-green-600 bg-green-400" : "dark:bg-gray-600 bg-gray-400"} px-2 py-1 rounded-md cursor-pointer`} key={period.value} aria-label={`Toggle ${period.label}`} onClick={() => handlePeriodChange('paid', period.value)}>
                                {period.label}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Charged Amount</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 font-bold text-2xl">{formatAmount(chargedAmount)}</div>
                    <div className='flex flex-wrap gap-3'>
                        {periods.map((period) => (
                            <div className={`${chargedPeriod === period.value ? "dark:bg-green-600 bg-green-400" : "dark:bg-gray-600 bg-gray-400"} px-2 py-1 rounded-md cursor-pointer`} key={period.value} aria-label={`Toggle ${period.label}`} onClick={() => handlePeriodChange('charged', period.value)}>
                                {period.label}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            {isLoading && <div className="col-span-2 text-center">Loading...</div>}
            {error && <div className="col-span-2 text-center text-red-500">{error}</div>}
        </div>
    )
}