import { z } from 'zod';

//For Signing Up
export const ProfileSchema = z
    .object({
        id: z
            .string({ required_error: "ID is required" }),
        name: z
            .string({ required_error: 'Name is required' }),
        profilePicture: z
            .string().optional(),
    });

export type Profile = z.infer<typeof ProfileSchema>;