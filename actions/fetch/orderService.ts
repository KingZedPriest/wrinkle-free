import { prisma } from "@/lib/prismadb";

export async function fetchOrders(startDate?: Date, endDate?: Date, page: number = 1, pageSize: number = 20) {
    try {
        const where = startDate && endDate
            ? {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            }
            : startDate
                ? {
                    createdAt: {
                        gte: startDate,
                    },
                }
                : {};

        const [orders, totalCount] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    items: true,
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.order.count({ where }),
        ]);

        return {
            orders: orders.map((order) => ({
                id: order.id,
                orderId: order.orderId,
                items: order.items.map((item) => ({
                    service: item.service,
                    quantity: item.quantity,
                })),
                price: order.price,
                status: order.status,
            })),
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}