"use server"

import { prisma } from "@/lib/prismadb"

export async function editOrder(id: string, price: number, service: string, quantity: number, status: "pending" | "in_progress" | "completed" | "cancelled") {

    try {
        // Find the order with its items
        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                items: true
            }
        });

        if (!order || order.items.length === 0) {
            throw new Error("Order or order items not found");
        }

        // Update the amount and the first item in the order
        await prisma.order.update({
            where: {
                id
            },
            data: {
                price,
                status,
                items: {
                    update: {
                        where: {
                            id: order.items[0].id 
                        },
                        data: {
                            service,
                            quantity
                        }
                    }
                }
            },
        });

        // Send back a response
        return { success: true, message: "The order was updated successfully." }

    } catch (error) {
        console.error('Error updating the order', error)
        return { success: false, error: error }
    }
}
