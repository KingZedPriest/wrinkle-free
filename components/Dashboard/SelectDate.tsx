'use client'

import React, { useState } from 'react';
import { format } from 'date-fns';

//Components
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

//Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar, ArrowDown2 } from 'iconsax-react';


export default function SelectDate() {

    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

    //Functions
    const handleDateClick = (day: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        setSelectedDate(newDate)
        //onDateSelect(newDate)
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
                <Button variant="outline" className="w-[200px] justify-start text-left">
                    <Calendar className="mr-3 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
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
                            <div key={`SD-${day}`} className="text-center font-medium text-gray-500 dark:text-gray-400 text-sm">
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                            <div key={`SDEmpty-${index}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, index) => {
                            const day = index + 1
                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                            const isSelected = selectedDate?.toDateString() === date.toDateString()
                            const isToday = new Date().toDateString() === date.toDateString()

                            return (
                                <button
                                    key={`SD1-${day}`}
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