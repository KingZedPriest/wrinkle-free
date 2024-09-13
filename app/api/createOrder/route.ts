import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//Libs
import { generateOrderId } from '@/lib/generate';

export async function POST(request: NextRequest) {

    const body = await request.json();
    console.log({body})

    try {

        const { email, name, notes, amountPaid, images, price, quantity, service, pickupDay, user } = body;
        
        let orderId: string;
        let currentUser: User;

        if (!user) {
            //Create new user
            currentUser = await prisma.user.create({
                data: {
                    name,
                    notes
                }
            })
        } else {
            currentUser = user;
        }

        console.log({currentUser})

        // Generate a unique orderId
        do {
            orderId = generateOrderId();
        } while (await prisma.order.findUnique({ where: { orderId } }));

        //Create a new order
        const newOrder = await prisma.order.create({
            data: {
                orderId,
                userId: currentUser.id,
                price,
                amountPaid,
                pickupDay,
                admin: email,
            }
        })

        console.log({newOrder})

        //Create a new order item
        const newOrderItem = await prisma.orderItem.create({
            data: {
                orderId: newOrder.id,
                picture: images,
                quantity,
                service
            }
        })

        console.log({newOrderItem})

        return NextResponse.json(newOrderItem);

    } catch (error) {
        console.error("Error creating an order:", error);

        if (error instanceof Error) {
            return new NextResponse(error.message);
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}