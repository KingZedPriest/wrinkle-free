import { z } from 'zod';

//For Creating a new Admin
export const OrderSchema = z
    .object({
        notes: z
            .string().optional(),
        price: z
            .number({ required_error: "Price is needed", invalid_type_error: "Kindly enter a number" }).positive({message: "Only positive numbers are accepted"}),
        amountPaid: z
            .number({ required_error: "Amount paid is required", invalid_type_error: "Kindly enter a number" }).positive({message: "Only positive numbers are accepted"}),
        pickupDay: z
            .date({ required_error: "The pick up day is required", invalid_type_error: "Kindly chose a date" }),
        quantity: z
            .number({ required_error: "The total number of clothes is required", invalid_type_error: "Kindly enter a number" }).positive({message: "Only positive numbers are accepted"}),
        service: z
            .string({ required_error: "Kindly specify the laundry service for clothes", invalid_type_error: "Kindly enter a word or a sentence" })
    });

export type Order = z.infer<typeof OrderSchema>;