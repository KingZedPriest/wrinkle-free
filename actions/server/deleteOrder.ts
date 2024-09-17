"use server"

import { prisma } from "@/lib/prismadb";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function deleteOrder(orderId: string) {
    try {
        // Fetch the order and its items
        const order = await prisma.order.findUnique({
            where: {
                orderId,
            },
            include: {
                items: true,
            },
        });

        if (order) {
            // Delete each picture associated with the order items
            for (const item of order.items) {
                for (const picture of item.picture) {
                    const key = picture.split("/").pop();
                    if (key) {
                        const deleteObjectCommand = new DeleteObjectCommand({
                            Bucket: process.env.BUCKET_NAME!,
                            Key: key,
                        });

                        await s3Client.send(deleteObjectCommand);
                    }
                }
            }

            // Delete the Order
            await prisma.order.delete({
                where: {
                    orderId,
                },
            });

            return { success: true, message: "The Order and its items were deleted successfully." };
        } else {
            return { success: false, message: "Order not found." };
        }
    } catch (error) {
        console.error('Error deleting order', error);
        return { success: false, error: error };
    }
}
