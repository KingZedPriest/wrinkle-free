//Icons
import { TickCircle } from "iconsax-react";

const TransactionDetails = ({ clientName, createdAt, paidAmount }: TransactionProps) => {
    return (
        <main className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 py-2.5">
            <div className="flex gap-x-2 items-center">
                <TickCircle size="40" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 p-2 rounded-full" />
                <div className="flex flex-col gap-y-1">
                    <p className="text-xs md:text-sm lg:text-xs xl:text-base font-semibold text-black dark:text-white">Payment from {clientName}</p>
                    <p className="text-[10px] md:text-xs xl:text-sm">{createdAt}</p>
                </div>
            </div>
            <div>
                <p className="text-xs md:text-sm lg:text-xs xl:text-base font-semibold text-black dark:text-white">+₦{paidAmount}</p>
                <p className='bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 text-[10px] md:text-xs px-2 inline-flex leading-5 font-semibold rounded-full'>Success</p>
            </div>
        </main>
    );
}

export default TransactionDetails;