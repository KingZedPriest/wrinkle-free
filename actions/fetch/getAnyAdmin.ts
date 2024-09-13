import { prisma } from "@/lib/prismadb";

export default async function getAdmin(id: string) {

    try {
        const getAdmin = await prisma.admin.findUnique({
            where: {
                id
            }
        });

        if (!getAdmin) { throw new Error("Admin with Id not found") }

        return getAdmin;

    } catch (error: any) {
        console.error(`There was an error in fetching the admin with Id ${id}, the error: ${error}`);
        throw error;
    }

}
