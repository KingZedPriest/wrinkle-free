import { prisma } from "@/lib/prismadb";

export default async function getOrder(orderId: string) {

    try {
        const order = await prisma.order.findUnique({
            where: {
                orderId
            },
            include: {
                user: true,
                items: true
            }
        });

        if (!order) { throw new Error("Order with Id not found") }

        return order;

    } catch (error: any) {
        console.error(`There was an error in fetching the order with Id ${orderId}, the error: ${error}`);
        throw error;
    }

}
