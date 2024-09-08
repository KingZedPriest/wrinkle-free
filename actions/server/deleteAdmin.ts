"use server"

import { prisma } from "@/lib/prismadb"

export async function deleteAdmin(id: string) {

    try {
        
        await prisma.admin.delete({
            where: {
                id
            },
        });

        return { success: true, message: "The Admin was deleted successfully." }

    } catch (error) {
        console.error('Error deleting admin', error)
        return { success: false, error: error }
    }
}