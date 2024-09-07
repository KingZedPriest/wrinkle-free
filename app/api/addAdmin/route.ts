import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//Libs, Schemas, Utils
import { Staff } from '@/schemas/staff.schema';
import { encryptPassword } from '@/lib/token';

export async function POST(request: NextRequest) {
    const body: Staff = await request.json();

    try {

        const { name, email, password, suspended, role } = body;

        //Fetch the admin using their email
        const admin = await prisma.admin.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })

        //Throw an error if the admin exists
        if (admin) return new NextResponse('An admin with the email exists.', { status: 409 });

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Encrypt the password
        const encryptedPassword = encryptPassword(password)

        //Create new admin account
        const newAdmin = await prisma.admin.create({
            data: {
                name,
                email: email.toLowerCase(),
                hashedPassword,
                encryptedPassword,
                suspended,
                role: role ? "super_admin" : "admin"
            }
        })

        return NextResponse.json(newAdmin);

    } catch (error) {
        console.error("Error creating Admin:", error);

        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}