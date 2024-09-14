import Link from "next/link";

//Server actions
import { getCurrentUser } from "@/actions/fetch/currentUser";
import getAdmin from "@/actions/fetch/getAnyAdmin";
import getUserAndOrders from "@/actions/fetch/ordersAndUsers";

//Components
import ScrollReveal from "@/components/RevelOnScroll";
import SummaryBox from "@/components/Dashboard/SummaryBox";
import Chart from "@/components/Dashboard/Chart";
import TransactionDetails from "@/components/Dashboard/TransactionDetails";
import SelectDate from "@/components/Dashboard/SelectDate";
import OrderTable from "@/components/Dashboard/OrderTable";

//Icons
import { ArrowDown2, Bag2, Clock, TickCircle, TrendDown, TrendUp, User } from "iconsax-react";

const page = async () => {

    const accessTokenUser = await getCurrentUser();
    const currentAdmin = await getAdmin(accessTokenUser.id);
    const { allOrders, allUsers, pendingOrders, completedOrders, analytics } = await getUserAndOrders()

    const summaryItems = [
        { title: "Total Order", icon: Bag2, color: "bg-[#516fff]/20 text-[#516fff]", amount: allOrders.length, icon1: analytics.totalOrders.percentageChange > 0 ? TrendUp : TrendDown, percent: analytics.totalOrders.percentageChange },
        { title: "Total Pending Order", icon: Clock, color: "bg-[#f98838]/20 text-[#f98838]", amount: pendingOrders.length, icon1: analytics.pendingOrders.percentageChange > 0 ? TrendUp : TrendDown, percent: analytics.pendingOrders.percentageChange },
        { title: "Total Completed Order", icon: TickCircle, color: "bg-[#9879f4]/20 text-[#9879f4]", amount: completedOrders.length, icon1: analytics.completedOrders.percentageChange > 0 ? TrendUp : TrendDown, percent: analytics.completedOrders.percentageChange },
        { title: "Total Users", icon: User, color: "bg-[#f48fc7]/20 text-[#f48fc7]", amount: allUsers.length, icon1: analytics.totalUsers.percentageChange > 0 ? TrendUp : TrendDown, percent: analytics.totalUsers.percentageChange }
    ]

    return (
        <main className="py-5 mb-20 lg:mb-10">
            <ScrollReveal>
                <div key={"summaryBox"} className="flex flex-wrap gap-5">
                    {summaryItems.map((item, index) => (
                        <SummaryBox key={`summary-${index}`} title={item.title} icon={item.icon} color={item.color} amount={item.amount} icon1={item.icon1} percent={item.percent} />
                    ))}
                </div>
            </ScrollReveal>
            <ScrollReveal>
                <div key={"transactions"} className="flex flex-col lg:flex-row gap-5 mt-10">
                    <div className="w-full lg:w-[60%] border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                        <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">Today Transaction</p>
                        <Chart orderToday={analytics.totalOrders.today} orderYesterday={analytics.totalOrders.yesterday} totalUsers6Months={analytics.usersLastSixMonths} orderMonthlyPercentChange={analytics.monthlyOrders.percentageChange} />
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
                            {currentAdmin.role === "super_admin" &&
                                <div className="flex gap-x-3 items-center bg-light-600 dark:bg-dark-600 justify-center p-4 rounded-xl mt-5 hover:text-generalBlue dark:hover:text-cloudBlue duration-300">
                                    <Link href="/orders/transactions">View All Transactions</Link>
                                    <ArrowDown2 size="20" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </ScrollReveal>
            <ScrollReveal>
                <div key={"table"} className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl mt-10">
                    <div className="flex flex-col gap-y-1 sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                        <p className="text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white">Latest Orders<span className="text-[10px] md:text-xs xl:text-sm sm:hidden ml-6">Last 10 (Ten)</span></p>
                        <SelectDate />
                        <p className="text-[10px] md:text-xs xl:text-sm hidden sm:block">Last 10 (Ten)</p>
                    </div>
                    <div className="mt-5">
                        <OrderTable />
                    </div>
                </div>
            </ScrollReveal>
        </main>
    );
}

export default page;