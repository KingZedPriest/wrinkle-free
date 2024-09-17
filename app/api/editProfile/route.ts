import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//Schemas and Lib
import { Profile } from '@/schemas/profile.schema';
import { encryptPassword } from '@/lib/token';

export async function POST(request: NextRequest) {
    const body: Profile = await request.json();

    try {

        const { id, name, password, profilePicture } = body;

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Encrypt the password
        const encryptedPassword = encryptPassword(password)

        //Edit your profile
        const editedProfile = await prisma.admin.update({
            where: {
                id
            },
            data: {
                name,
                hashedPassword,
                encryptedPassword,
                profilePicture
            }
        })

        //Return the updated profile
        return NextResponse.json(editedProfile);

    } catch (error) {
        console.error("Error editing profile:", error);

        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}