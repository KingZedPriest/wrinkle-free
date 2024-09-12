import { prisma } from "@/lib/prismadb";

export default async function getUsers(addOrder: boolean) {

    try {
        const getUsers = await prisma.user.findMany({
            include: {
                order: addOrder
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return getUsers;

    } catch (error: any) {
        console.error(error);
        throw error;
    }
}
