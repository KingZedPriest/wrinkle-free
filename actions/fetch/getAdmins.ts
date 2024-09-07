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
        console.error(error);
        throw error;
    }

}
