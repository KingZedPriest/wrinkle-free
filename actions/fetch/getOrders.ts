import { prisma } from "@/lib/prismadb";

export default async function getOrders() {

    try {
        const getOrders = await prisma.order.findMany({
            include: {
                items: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return getOrders;

    } catch (error: any) {
        console.error(`There was an error in fetching the orders ${error}`);
        throw error;
    }
}
