import { z } from 'zod';

//For Creating a new Admin
export const OrderSchema = z
    .object({
        notes: z
            .string().optional(),
        price: z
            .number({ required_error: "Price is needed" }).positive(),
        amountPaid: z
            .number({ required_error: "Amount paid is required" }).positive(),
        pickupDay: z
            .date({ required_error: "The pick up day is required" }),
        quantity: z
            .number({ required_error: "The total number of clothes is required" }).positive(),
        service: z
            .string({ required_error: "Kindly specify the laundry service for clothes" })
    });

export type Order = z.infer<typeof OrderSchema>;