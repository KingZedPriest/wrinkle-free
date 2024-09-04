import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

//Libs, Schemas
import { signSession } from '@/lib/token';
import { Auth } from '@/schemas/auth.schema';

export async function POST(request: NextRequest) {
    const body:Auth = await request.json();

    try {

        const { email, password, staySignedIn } = body;

        //Fetch the admin using their email
        const admin = await prisma.admin.findFirst({
            where: {
                email
            }
        })

        //Throw an error if the admin does not exist
        if (!admin) return new NextResponse('Wrong Email or Password.', { status: 400 })

        //Compare passwords
        const isCorrect = await bcrypt.compare(password, admin.hashedPassword!)
        if (!isCorrect) return new NextResponse('Wrong Email or Password', { status: 400 })

        //Convert the details as token, and save it as a cookie
        const data = await signSession(admin)

        // Save the admin hashed details as a cookie
        cookies().set({
            name: 'session',
            value: data,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            expires: staySignedIn ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: "strict",
        });

        return NextResponse.json(admin);

    } catch (error) {
        console.error("Error authenticating using email and password:", error);

        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}