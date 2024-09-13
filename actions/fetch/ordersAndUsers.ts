import { prisma } from "@/lib/prismadb";

export default async function getUserAndOrders() {

    try {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));

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
            yesterdayUsers
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
            })
        ]);

        // Calculate percentage changes
        const completedOrdersChange = calculatePercentageChange(yesterdayCompletedOrders, todayCompletedOrders);
        const pendingOrdersChange = calculatePercentageChange(yesterdayPendingOrders, todayPendingOrders);
        const totalOrdersChange = calculatePercentageChange(yesterdayTotalOrders, todayTotalOrders);
        const totalUsersChange = calculatePercentageChange(yesterdayUsers, todayUsers);

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
                }
            }
        };

    } catch (error: any) {
        console.error(`There was an error in fetching the orders: ${error}`);
        throw error;
    }
}

function calculatePercentageChange(yesterday: number, today: number): number {
    if (yesterday === 0) return today > 0 ? 100 : 0;
    return ((today - yesterday) / yesterday) * 100;
}