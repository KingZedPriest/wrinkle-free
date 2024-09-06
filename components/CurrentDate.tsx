'use client'

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function DateInText() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDateInText = (date: Date) => {
    return format(date, "EEEE, MMMM do, yyyy 'at' h:mm:ss a")
  }

  return (
    <div className="bg-light-600 dark:bg-dark-600 shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-sm md:text-base xl:text-lg font-semibold mb-4">Current Date and Time</h2>
      <p className="text-lg text-black dark:text-white" aria-live="polite">
        {formatDateInText(currentDate)}
      </p>
    </div>
  )
}