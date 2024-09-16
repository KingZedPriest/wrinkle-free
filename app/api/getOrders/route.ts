import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    //Fetch Params
    const page: number = parseInt(searchParams.get('page') || '1', 10);
    const pageSize: number = parseInt(searchParams.get('pageSize') || '20', 10);
    const startDateParam = searchParams.get("startDate");
    const startDate: Date | null = startDateParam ? new Date(startDateParam) : null;
    const endDateParams = searchParams.get("endDate");
    const endDate: Date | null = endDateParams ? new Date(endDateParams) : null;

    try {
        const where = startDate && endDate ? {
            createdAt:
            {
                gte: startDate,
                lte: endDate,
            },
        }
            : startDate
                ? {
                    createdAt: {
                        gte: startDate,
                    },
                }
                : {};

        const [orders, totalCount] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    items: true,
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.order.count({ where }),
        ]);

        return {
            orders: orders.map((order) => ({
                id: order.id,
                orderId: order.orderId,
                items: order.items.map((item) => ({
                    service: item.service,
                    quantity: item.quantity,
                })),
                price: order.price,
                status: order.status,
            })),
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}