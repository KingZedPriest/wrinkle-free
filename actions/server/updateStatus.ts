"use server"

import { prisma } from "@/lib/prismadb"

export async function updateOrder(orderId: string, status: "pending" | "in_progress" | "completed" | "cancelled") {

    try {

        await prisma.order.update({
            where: {
                orderId
            },
            data: {
                status: status
            }
        });

        return { success: true, message: "The Order was updated successfully." }

    } catch (error) {
        console.error('Error updating order', error)
        return { success: false, error: error }
    }
}