"use server"

import { prisma } from "@/lib/prismadb"

export async function deleteOrder(orderId: string) {

    try {
        
        await prisma.order.delete({
            where: {
                orderId
            },
        });

        return { success: true, message: "The Order and it's items were deleted successfully." }

    } catch (error) {
        console.error('Error deleting order', error)
        return { success: false, error: error }
    }
}