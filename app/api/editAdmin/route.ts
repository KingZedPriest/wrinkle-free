import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//Libs
import { encryptPassword } from '@/lib/token';

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {

        const { id, name, email, encryptedPassword, suspended, role } = body;

        //Hash the password
        const hashedPassword = await bcrypt.hash(encryptedPassword, 12);

        //Encrypt the password
        const finalEncryptedPassword = encryptPassword(encryptedPassword)

        //Edit the admin
        const editedAdmin = await prisma.admin.update({
            where: {
                id
            },
            data: {
                name,
                email: email.email.toLowerCase(),
                hashedPassword,
                encryptedPassword: finalEncryptedPassword,
                suspended,
                role: role ? "super_admin" : "admin"
            }
        })

        //Return the edited admin details
        return NextResponse.json(editedAdmin);

    } catch (error) {
        console.error("Error editing Admin:", error);

        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}