import { prisma } from "@/lib/prismadb";

export default async function getAdmins() {

    try {
        const getAdmins = await prisma.admin.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return getAdmins;

    } catch (error: any) {
        console.error(`There was an error in fetching all the admins ${error}`);
        throw error;
    }

}
