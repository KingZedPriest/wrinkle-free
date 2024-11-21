import Link from "next/link";

//Icons
import { TickCircle } from "iconsax-react";

const TransactionDetails = ({ orderId, clientName, createdAt, paidAmount }: TransactionProps) => {
    return (
        <Link href={`/orders/${orderId}`} className="flex justify-between items-center border-slate-200 dark:border-slate-800 py-2.5 border-b">
            <div className="flex items-center gap-x-2">
                <TickCircle size="40" className="bg-green-100 dark:bg-green-800 p-2 rounded-full text-green-800 dark:text-green-100" />
                <div className="flex flex-col gap-y-1">
                    <p className="font-semibold text-black text-xs md:text-sm lg:text-xs xl:text-base dark:text-white">Payment from {clientName}</p>
                    <p className="text-[10px] xl:text-sm md:text-xs">{createdAt}</p>
                </div>
            </div>
            <div>
                <p className="font-semibold text-black text-xs md:text-sm lg:text-xs xl:text-base dark:text-white">+₦{paidAmount}</p>
                <p className='inline-flex bg-green-100 dark:bg-green-800 px-2 rounded-full font-semibold text-[10px] text-green-800 md:text-xs dark:text-green-100 leading-5'>Success</p>
            </div>
        </Link>
    );
}

export default TransactionDetails;