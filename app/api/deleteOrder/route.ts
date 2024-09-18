import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prismadb';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

//Helper function for deleting images from the bucket
async function deleteImagesFromS3(keys: string[]) {
    for (const key of keys) {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: key,
        });
        await s3Client.send(deleteObjectCommand);
    }
}

//Helper function for getting the images that needs to be deleted
async function getOrderKeys(orderIds: string[]) {
    const orders = await prisma.order.findMany({
        where: {
            orderId: { in: orderIds },
        },
        include: { items: true },
    });

    const keysToDelete: string[] = [];

    for (const order of orders) {
        for (const item of order.items) {
            for (const picture of item.picture) {
                const key = picture.split('/').pop();
                if (key) {
                    keysToDelete.push(key);
                }
            }
        }
    }

    return keysToDelete;
}

export async function DELETE(request: NextRequest, response: NextResponse) {

    const body = await request.json();

    const { orderId, selectedIds } = body;

    try {

        let keysToDelete: string[] = [];
        if (orderId) {

            //Make sure the order exists, throw an error if it doesn't exist
            const orderExists = await prisma.order.findUnique({
                where: {
                    orderId
                }
            });
            if (!orderExists) return new NextResponse('Order not found, please try again later.', { status: 404 })

            // Handle single order deletion
            keysToDelete = await getOrderKeys([orderId]);

            //Delete Images from S3 Bucket
            await deleteImagesFromS3(keysToDelete);

            //Delete the order from database
            await prisma.order.delete({ where: { orderId } });

            return NextResponse.json("The order was deleted successfully.")

        } else if (selectedIds && Array.isArray(selectedIds)) {

            const ordersExist = await prisma.order.findMany({
                where: {
                    orderId: {
                        in: selectedIds,
                    },
                },
                include: {
                    items: true,
                },
            });

            if (!ordersExist) return new NextResponse('Order not found, please try again later.', { status: 404 })

            // Handle multiple orders deletion
            keysToDelete = await getOrderKeys(selectedIds);

            //Delete Images from S3 Bucket
            await deleteImagesFromS3(keysToDelete);

            //Delete the orders from database
            await prisma.order.deleteMany({ where: { id: { in: selectedIds } } });

            return NextResponse.json("The order was deleted successfully.")
        } else {
            return new NextResponse("No orderId or selectedIds provided.", { status: 400 });
        }

    } catch (error) {
        console.error('Error deleting order(s)', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
