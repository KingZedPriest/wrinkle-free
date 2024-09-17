import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prismadb';

//Libs
import { dateConverter } from '@/lib/date';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    //Fetch Params
    const page: number = parseInt(searchParams.get('page') || '1', 10);
    const limit: number = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit

    try {
        const [orders, totalCount] = await Promise.all([
            prisma.order.findMany({
                select: {
                    orderId: true,
                    price: true,
                    amountPaid: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: limit,
            }),
            prisma.order.count(),
        ]);

        // Format the data
        const formattedOrders = orders.map(order => ({
            price: order.price,
            orderId: order.orderId,
            amountPaid: order.amountPaid ?? 0,
            createdAt: dateConverter(order.createdAt),
            clientName: order.user?.name ?? 'Unknown'
        }));

        return NextResponse.json({
            orderTransactions: formattedOrders,
            totalPages: Math.ceil(totalCount / limit),
        });

    } catch (error) {
        console.error('Error fetching transaction orders for the page:', error);
        return NextResponse.error();
    }
}