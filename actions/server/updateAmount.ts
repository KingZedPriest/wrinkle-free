"use server"

import { prisma } from "@/lib/prismadb"

export async function updateAmount(orderId: string, amount: number, remove: boolean) {

    try {

        //Fetch Current Amount
        const order = await prisma.order.findUnique({
            where: {
                orderId
            }
        })
        
        //Update the amount
        await prisma.order.update({
            where: {
                orderId
            },
            data: {
                amountPaid: remove ? (order?.amountPaid ?? 0) - amount : (order?.amountPaid ?? 0) + amount,
            },
        });

        //Send back a response
        return { success: true, message: "The amount paid was updated successfully." }

    } catch (error) {
        console.error('Error updating amount paid', error)
        return { success: false, error: error }
    }
}