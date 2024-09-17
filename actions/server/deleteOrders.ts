"use server"

import { prisma } from '@/lib/prismadb';
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function deleteSelectedOrders(selectedIds: string[]) {
    try {
        // Fetch all orders and their items
        const orders = await prisma.order.findMany({
            where: {
                id: {
                    in: selectedIds,
                },
            },
            include: {
                items: true,
            },
        });

        // Collect all keys to delete from S3
        const keysToDelete: string[] = [];

        for (const order of orders) {
            for (const item of order.items) {
                for (const picture of item.picture) {
                    const key = picture.split("/").pop();
                    if (key) {
                        keysToDelete.push(key);
                    }
                }
            }
        }

        // Delete each image from S3
        for (const key of keysToDelete) {
            const deleteObjectCommand = new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME!,
                Key: key,
            });
            await s3Client.send(deleteObjectCommand);
        }

        // Delete the orders from the database
        await prisma.order.deleteMany({
            where: {
                id: {
                    in: selectedIds,
                },
            },
        });

        // Send back a response
        return { success: true, message: "The orders were deleted successfully." };

    } catch (error) {
        console.error('Error deleting orders', error);
        return { success: false, error: error };
    }
}
