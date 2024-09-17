import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prismadb';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    if (!name) {
        return new NextResponse("Kindly provide an orderId or a name", { status: 400 });
    }

    try {
        const searchOptions = {
            contains: name,
            mode: Prisma.QueryMode.insensitive, // Explicitly set mode
        };

        const [orderData, orderCount] = await Promise.all([
            prisma.order.findMany({
                where: { orderId: searchOptions },
                include: { user: true },
                take: limit,
                skip,
            }),
            prisma.order.count({ where: { orderId: searchOptions } })
        ]);

        const [userData, userCount] = await Promise.all([
            prisma.user.findMany({
                where: { name: searchOptions },
                include: { order: true },
                take: limit,
                skip,
            }),
            prisma.user.count({ where: { name: searchOptions } })
        ]);

        const [staffData, staffCount] = await Promise.all([
            prisma.admin.findMany({
                where: { name: searchOptions },
                take: limit,
                skip,
            }),
            prisma.admin.count({ where: { name: searchOptions } })
        ]);

        let data, totalCount, type: string;

        if (orderData.length > 0) {
            data = orderData;
            totalCount = orderCount;
            type = "order";
        } else if (userData.length > 0) {
            data = userData;
            totalCount = userCount;
            type = "user";
        } else if (staffData.length > 0) {
            data = staffData;
            totalCount = staffCount;
            type = "admin"
        } else {
            return NextResponse.error();
        }

        return NextResponse.json({
            data,
            metadata: {
                totalCount,
                page,
                limit,
                type,
                totalPages: Math.ceil(totalCount / limit),
            },
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
