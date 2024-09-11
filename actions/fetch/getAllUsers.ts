import { prisma } from "@/lib/prismadb";

export default async function getUsers() {

    try {
        const getUsers = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });

        if (!getUsers) { throw new Error("Users not found") }

        return getUsers;

    } catch (error: any) {
        console.error(error);
        throw error;
    }

}
