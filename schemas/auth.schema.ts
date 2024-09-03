import { z } from 'zod';

//For Signing Up
export const AuthSchema = z
    .object({
        email: z
            .string({ required_error: 'Email is required' })
            .email('Please enter a valid email address'),
        password: z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must have at least 6 characters')
    });

export type Auth = z.infer<typeof AuthSchema>;