"use server"

import { prisma } from "@/lib/prismadb"

export async function updateStatus(id: string, type: string) {

    try {
        
        await prisma.admin.update({
            where: {
                id
            },
            data: {
                suspended: type === "suspend" ? true : false,
            },
        });

        return { success: true, message: "Admin status was updated successfully." }

    } catch (error) {
        console.error('Error updating admin suspension status', error)
        return { success: false, error: error }
    }
}