import { z } from 'zod';

//For Signing Up
export const StaffSchema = z
    .object({
        name: z
            .string({ required_error: "Name is required" }),
        email: z
            .string({ required_error: 'Email is required' })
            .email('Please enter a valid email address'),
        password: z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must have at least 6 characters'),
        staySignedIn: z
            .boolean().optional(),
        role: z
            .boolean().optional()
    });

export type Staff = z.infer<typeof StaffSchema>;