'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function DateInText() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateInText = (date: Date) => {
    return format(date, "EEEE, MMMM do, yyyy 'at' h:mm:ss a");
  };

  return (
    <div className="flex flex-col gap-y-1 my-3">
      <p className='text-[10px] md:text-xs xl:text-sm'>Current Date and Time</p>
      <p className="text-black dark:text-white font-semibold" aria-live="polite">
        {currentDate ? formatDateInText(currentDate) : 'Loading...'}
      </p>
    </div>
  );
}
