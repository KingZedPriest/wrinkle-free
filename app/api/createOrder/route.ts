import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//Libs
import { generateOrderId } from '@/lib/generate';

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {

        const {  } = body

        //Create new admin account
        // const newOrder = await prisma.order.create({
        //     data: {
               
        //     }
        // })

        //Revalidate the path
        //return NextResponse.json(newOrder);

    } catch (error) {
        console.error("Error creating an oder:", error);

        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}