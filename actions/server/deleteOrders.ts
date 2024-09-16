"use server"

import { prisma } from '@/lib/prismadb';


export async function deleteSelectedOrders(selectedIds: string[]) {
    try {
        await prisma.order.deleteMany({
            where: {
                id: {
                    in: selectedIds,
                },
            },
        });

        //Send back a response
        return { success: true, message: "The orders was deleted successfully." }

    } catch (error) {
        console.error('Error deleting orders', error)
        return { success: false, error: error }
    }
}
