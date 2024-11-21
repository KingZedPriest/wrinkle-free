'use client'

import { useState, useEffect } from 'react';

//Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//utils
import formatAmount from '@/lib/formatAmount'

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        setIsDropdownOpen(false)
    }

    return (
        <div className="gap-4 grid md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Total Paid Amount</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 font-bold text-2xl">{formatAmount(paidAmount)}</div>
                    <Select value={paidPeriod} onValueChange={(value) => handlePeriodChange('paid', value)} onOpenChange={setIsDropdownOpen}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            {periods.map((period) => (
                                <SelectItem key={period.value} value={period.value}>
                                    {period.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Charged Amount</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 font-bold text-2xl">{formatAmount(chargedAmount)}</div>
                    <Select value={chargedPeriod} onValueChange={(value) => handlePeriodChange('charged', value)} onOpenChange={setIsDropdownOpen}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            {periods.map((period) => (
                                <SelectItem key={period.value} value={period.value}>
                                    {period.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            {isLoading && <div className="col-span-2 text-center">Loading...</div>}
            {error && <div className="col-span-2 text-center text-red-500">{error}</div>}
            {isDropdownOpen && (
                <div className="z-40 fixed inset-0 bg-black/50" onClick={() => setIsDropdownOpen(false)} />
            )}
        </div>
    )
}