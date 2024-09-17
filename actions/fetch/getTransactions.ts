import { prisma } from "@/lib/prismadb";

//Libs
import { dateConverter } from "@/lib/date";

export default async function fetchPaymentOrders(limit?: number) {
    try {
        const orders = await prisma.order.findMany({
            select: {
                orderId: true,
                price: true,
                amountPaid: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            ...(limit ? { take: limit } : {})
        });

        // Format the data
        const formattedOrders = orders.map(order => ({
            price: order.price,
            orderId: order.orderId,
            amountPaid: order.amountPaid ?? 0,
            createdAt: dateConverter(order.createdAt),
            clientName: order.user?.name ?? 'Unknown'
        }));

        return formattedOrders;
    } catch (error) {
        console.error('Error fetching transaction orders:', error);
        throw error;
    }
}