'use client'

import React, { useState } from 'react';
import { format } from 'date-fns';

//Components
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar, ArrowDown2 } from 'iconsax-react';


export default function DateRangeSelect({ onDateRangeSelect }: { onDateRangeSelect: (start: Date, end: Date) => void }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        if (!startDate || (startDate && endDate)) {
            setStartDate(clickedDate)
            setEndDate(null)
        } else if (clickedDate > startDate) {
            setEndDate(clickedDate)
            onDateRangeSelect(startDate, clickedDate)
        } else {
            setStartDate(clickedDate)
            setEndDate(null)
        }
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[250px] justify-start text-left font-normal">
                    <Calendar className="mr-3 h-4 w-4" />
                    {startDate && endDate ? (
                        `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`
                    ) : (
                        <span>Pick a date range</span>
                    )}
                    <ArrowDown2 className="ml-3 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h2 className="text-lg font-semibold">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div key={day} className="text-center font-medium text-gray-500 dark:text-gray-400 text-sm">
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                            <div key={`empty-${index}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, index) => {
                            const day = index + 1
                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                            const isSelected =
                                (startDate && date >= startDate && (!endDate || date <= endDate)) ||
                                (endDate && date <= endDate && (!startDate || date >= startDate))
                            const isToday = new Date().toDateString() === date.toDateString()

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className={`p-2 rounded-full text-center text-sm ${isSelected
                                        ? 'bg-blue-500 text-white'
                                        : isToday
                                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                                            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}>
                                    {day}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}