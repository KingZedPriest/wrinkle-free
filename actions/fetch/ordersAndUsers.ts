import { prisma } from "@/lib/prismadb";

export default async function getUserAndOrders() {
    try {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const [
            allOrders,
            allUsers,
            pendingOrders,
            completedOrders,
            todayCompletedOrders,
            yesterdayCompletedOrders,
            todayPendingOrders,
            yesterdayPendingOrders,
            todayTotalOrders,
            yesterdayTotalOrders,
            todayUsers,
            yesterdayUsers,
            usersLastSixMonths,
            thisMonthOrders,
            lastMonthOrders
        ] = await Promise.all([
            // All orders
            prisma.order.findMany({
                include: { items: true },
                orderBy: { createdAt: "desc" }
            }),

            // All users
            prisma.user.findMany({
                orderBy: { createdAt: "desc" }
            }),

            // Pending orders
            prisma.order.findMany({
                where: { status: "pending" },
                include: { items: true }
            }),

            // Completed orders
            prisma.order.findMany({
                where: { status: "completed" },
                include: { items: true }
            }),

            // Today's completed orders
            prisma.order.count({
                where: {
                    status: "completed",
                    createdAt: { gte: startOfToday }
                }
            }),

            // Yesterday's completed orders
            prisma.order.count({
                where: {
                    status: "completed",
                    createdAt: {
                        gte: startOfYesterday,
                        lt: startOfToday
                    }
                }
            }),

            // Today's pending orders
            prisma.order.count({
                where: {
                    status: "pending",
                    createdAt: { gte: startOfToday }
                }
            }),

            // Yesterday's pending orders
            prisma.order.count({
                where: {
                    status: "pending",
                    createdAt: {
                        gte: startOfYesterday,
                        lt: startOfToday
                    }
                }
            }),

            // Today's total orders
            prisma.order.count({
                where: {
                    createdAt: { gte: startOfToday }
                }
            }),

            // Yesterday's total orders
            prisma.order.count({
                where: {
                    createdAt: {
                        gte: startOfYesterday,
                        lt: startOfToday
                    }
                }
            }),

            // Today's total users
            prisma.user.count({
                where: {
                    createdAt: { gte: startOfToday }
                }
            }),

            // Yesterday's total users
            prisma.user.count({
                where: {
                    createdAt: {
                        gte: startOfYesterday,
                        lt: startOfToday
                    }
                }
            }),

            // Total users in the last 6 months
            prisma.user.count({
                where: {
                    createdAt: {
                        gte: sixMonthsAgo
                    }
                }
            }),

            // Total orders this month
            prisma.order.count({
                where: {
                    createdAt: {
                        gte: startOfThisMonth
                    }
                }
            }),

            // Total orders last month
            prisma.order.count({
                where: {
                    createdAt: {
                        gte: startOfLastMonth,
                        lt: startOfThisMonth
                    }
                }
            })
        ]);

        // Calculate percentage changes
        const completedOrdersChange = calculatePercentageChange(yesterdayCompletedOrders, todayCompletedOrders);
        const pendingOrdersChange = calculatePercentageChange(yesterdayPendingOrders, todayPendingOrders);
        const totalOrdersChange = calculatePercentageChange(yesterdayTotalOrders, todayTotalOrders);
        const totalUsersChange = calculatePercentageChange(yesterdayUsers, todayUsers);
        const monthlyOrdersChange = calculatePercentageChange(lastMonthOrders, thisMonthOrders);

        return {
            allOrders,
            pendingOrders,
            completedOrders,
            allUsers,
            analytics: {
                completedOrders: {
                    today: todayCompletedOrders,
                    yesterday: yesterdayCompletedOrders,
                    percentageChange: completedOrdersChange
                },
                pendingOrders: {
                    today: todayPendingOrders,
                    yesterday: yesterdayPendingOrders,
                    percentageChange: pendingOrdersChange
                },
                totalOrders: {
                    today: todayTotalOrders,
                    yesterday: yesterdayTotalOrders,
                    percentageChange: totalOrdersChange
                },
                totalUsers: {
                    today: todayUsers,
                    yesterday: yesterdayUsers,
                    percentageChange: totalUsersChange
                },
                usersLastSixMonths,
                monthlyOrders: {
                    thisMonth: thisMonthOrders,
                    lastMonth: lastMonthOrders,
                    percentageChange: monthlyOrdersChange
                }
            }
        };

    } catch (error: any) {
        console.error(`There was an error in fetching the orders and users: ${error}`);
        throw error;
    }
}

function calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
}