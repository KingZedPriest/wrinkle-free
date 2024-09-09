import { z } from 'zod';

//For Signing Up
export const ProfileSchema = z
    .object({
        name: z
            .string({ required_error: 'Name is required' }),
        profilePicture: z
            .string().optional(),
    });

export type Profile = z.infer<typeof ProfileSchema>;