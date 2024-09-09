import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//Schemas
import { Profile } from '@/schemas/profile.schema';

export async function POST(request: NextRequest) {
    const body: Profile = await request.json();

    try {

        const { id, name, profilePicture } = body;

        //Edit your profile
        const editedProfile = await prisma.admin.update({
            where: {
                id
            },
            data: {
                name,
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