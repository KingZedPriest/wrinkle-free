import { z } from 'zod';

//For Creating a new Order with a new user
export const NewUserOrderSchema = z
    .object({
        name: z
            .string({ required_error: "Name is needed", invalid_type_error: "Kindly enter a name" }),
        notes: z
            .string().optional(),
        price: z
            .string()
            .transform((val) => Number(val))
            .refine((n) => !isNaN(n), { message: "Invalid number" })
            .refine((n) => n > 0, { message: "Only positive numbers are accepted" }),

        amountPaid: z
            .string()
            .transform((val) => Number(val))
            .refine((n) => !isNaN(n), { message: "Invalid number" })
            .refine((n) => n >= 0, { message: "Only non-negative numbers are accepted" }),

        quantity: z
            .string()
            .transform((val) => Number(val))
            .refine((n) => !isNaN(n), { message: "Invalid number" })
            .refine((n) => n > 0, { message: "Only positive numbers are accepted" }),
        pickupDay: z
            .string()
            .transform((str) => new Date(str))
            .refine((date) => !isNaN(date.getTime()), {
                message: "Invalid date",
            }),
        service: z
            .string({ required_error: "Kindly specify the laundry service for clothes", invalid_type_error: "Kindly enter a word or a sentence" })
    });

export type NewUserOrder = z.infer<typeof NewUserOrderSchema>;


//For Creating a new Order without a new user
export const UserOrderSchema = z
    .object({
        price: z
            .string()
            .transform((val) => Number(val))
            .refine((n) => !isNaN(n), { message: "Invalid number" })
            .refine((n) => n > 0, { message: "Only positive numbers are accepted" }),

        amountPaid: z
            .string()
            .transform((val) => Number(val))
            .refine((n) => !isNaN(n), { message: "Invalid number" })
            .refine((n) => n >= 0, { message: "Only non-negative numbers are accepted" }),

        quantity: z
            .string()
            .transform((val) => Number(val))
            .refine((n) => !isNaN(n), { message: "Invalid number" })
            .refine((n) => n > 0, { message: "Only positive numbers are accepted" }),
        pickupDay: z
            .string()
            .transform((str) => new Date(str))
            .refine((date) => !isNaN(date.getTime()), {
                message: "Invalid date",
            }),
        service: z
            .string({ required_error: "Kindly specify the laundry service for clothes", invalid_type_error: "Kindly enter a word or a sentence" })
    });

export type UserOrder = z.infer<typeof UserOrderSchema>;