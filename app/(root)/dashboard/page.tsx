//Components
import SummaryBox from "@/components/Dashboard/SummaryBox";
import Chart from "@/components/Dashboard/Chart";

//Icons
import { Bag2, Clock, TickCircle, TrendDown, TrendUp, User } from "iconsax-react";

const summaryItems = [
    { title: "Total Order", icon: Bag2, color: "bg-[#516fff]/20 text-[#516fff]", amount: 220, icon1: TrendUp, percent: 0.1 },
    { title: "Total Pending Order", icon: Clock, color: "bg-[#f98838]/20 text-[#f98838]", amount: 10, icon1: TrendDown, percent: -0.1 },
    { title: "Total Completed Order", icon: TickCircle, color: "bg-[#9879f4]/20 text-[#9879f4]", amount: 210, icon1: TrendUp, percent: 0.1 },
    { title: "Total Users", icon: User, color: "bg-[#f48fc7]/20 text-[#f48fc7]", amount: 18, icon1: TrendUp, percent: 0.1 }
]

const page = () => {
    return (
        <main className="py-5">
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
                    <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">Transaction History</p>
                </div>
            </div>
        </main>
    );
}

export default page;