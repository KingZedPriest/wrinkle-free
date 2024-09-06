//Icons
import { TickCircle } from "iconsax-react";

const TransactionDetails = () => {
    return (
        <main className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 py-2.5">
            <div className="flex gap-x-2 items-center">
                <TickCircle size="40" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 p-2 rounded-full" />
                <div className="flex flex-col gap-y-1">
                    <p className="font-semibold text-black dark:text-white">Payment from Charles Chukwuemeka</p>
                    <p className="text-[10px] md:text-xs xl:text-sm">3 Hours ago</p>
                </div>
            </div>
            <div>
                <p className="font-semibold text-black dark:text-white">+₦45,000</p>
                <p className='bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 text-[10px] md:text-xs xl:text-sm rounded-xl text-center py-0.5'>Success</p>
            </div>
        </main>
    );
}

export default TransactionDetails;