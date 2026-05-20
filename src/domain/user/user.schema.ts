import z from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const UpdateUserSchema = z.object({
  email: z.email('Invalid email address').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
  role: z.enum(['user', 'admin']).optional(),
});

export type UserDTO = z.infer<typeof CreateUserSchema> & {
  role: 'user' | 'admin';
};
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
