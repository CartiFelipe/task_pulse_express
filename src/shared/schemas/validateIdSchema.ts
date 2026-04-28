import z from 'zod';

export const validateIdSchema = z.object({
  id: z.coerce
    .number('ID must be a number')
    .int('ID must be an integer')
    .positive('ID must be a positive integer'),
});
