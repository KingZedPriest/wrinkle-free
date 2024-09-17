import { prisma } from "@/lib/prismadb";

export default async function getUsers() {

    try {
        const getUsers = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return getUsers;

    } catch (error: any) {
        console.error(`There was an error in fetching users ${error}`);
        throw error;
    }
}
