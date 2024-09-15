"use server"

import { prisma } from "@/lib/prismadb"

export async function updateAmount(orderId: string, amount: number) {

    try {
        
        await prisma.order.update({
            where: {
                orderId
            },
            data: {
                amountPaid: amount,
            },
        });

        return { success: true, message: "The amount paid was updated successfully." }

    } catch (error) {
        console.error('Error updating amount paid', error)
        return { success: false, error: error }
    }
}