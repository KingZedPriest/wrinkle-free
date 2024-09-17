import { prisma } from "@/lib/prismadb";

export default async function getOrders() {

    try {
        const allOrders = await prisma.order.findMany({
            include: {
                user: true,
                items: true
            },
            orderBy: { createdAt: "desc" }
        });

        const lastTenOrders = allOrders.slice(0, 10);

        return { allOrders, lastTenOrders };

    } catch (error: any) {
        console.error('Error fetching all orders and last ten:', error);
        throw error;
    }
}