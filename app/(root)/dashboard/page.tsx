import Link from "next/link";

//Components
import SummaryBox from "@/components/Dashboard/SummaryBox";
import Chart from "@/components/Dashboard/Chart";
import TransactionDetails from "@/components/Dashboard/TransactionDetails";

//Icons
import { ArrowDown2, Bag2, Clock, TickCircle, TrendDown, TrendUp, User } from "iconsax-react";


const summaryItems = [
    { title: "Total Order", icon: Bag2, color: "bg-[#516fff]/20 text-[#516fff]", amount: 220, icon1: TrendUp, percent: 0.1 },
    { title: "Total Pending Order", icon: Clock, color: "bg-[#f98838]/20 text-[#f98838]", amount: 10, icon1: TrendDown, percent: -0.1 },
    { title: "Total Completed Order", icon: TickCircle, color: "bg-[#9879f4]/20 text-[#9879f4]", amount: 210, icon1: TrendUp, percent: 0.1 },
    { title: "Total Users", icon: User, color: "bg-[#f48fc7]/20 text-[#f48fc7]", amount: 18, icon1: TrendUp, percent: 0.1 }
]

const page = () => {
    return (
        <main className="py-5 mb-20">
            <div className="flex flex-wrap gap-5">
                {summaryItems.map((item, index) => (
                    <SummaryBox key={index} title={item.title} icon={item.icon} color={item.color} amount={item.amount} icon1={item.icon1} percent={item.percent} />
                ))}
            </div>
            <div className="flex flex-col lg:flex-row gap-5 mt-10">
                <div className="w-full lg:w-[60%] border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                    <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">Today Transaction</p>
                    <Chart />
                </div>
                <div className="w-full lg:w-[36%] border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                        <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white">Transaction History</p>
                        <p className="text-[10px] md:text-xs xl:text-sm">Last 6 (Six)</p>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <TransactionDetails />
                        <TransactionDetails />
                        <TransactionDetails />
                        <TransactionDetails />
                        <TransactionDetails />
                        <TransactionDetails />
                        <div className="flex gap-x-3 items-center bg-light-600 dark:bg-dark-600 justify-center p-4 rounded-xl mt-5 hover:text-generalBlue dark:hover:text-cloudBlue duration-300">
                            <Link href="/orders/transactions">View All Transactions</Link>
                            <ArrowDown2 size="20" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="">

            </div>
        </main>
    );
}

export default page;