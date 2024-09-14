import { prisma } from "@/lib/prismadb";

//Libs
import { dateConverter } from "@/lib/date";

export async function fetchOrders() {
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
            }
        });

        // Transform the data to match the requested format
        const formattedOrders = orders.map(order => ({
            price: order.price,
            orderId: order.orderId,
            amountPaid: order.amountPaid ?? 0,
            createdAt: dateConverter(order.createdAt.toDateString()),
            clientName: order.user?.name ?? 'Unknown'
        }));

        return formattedOrders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}