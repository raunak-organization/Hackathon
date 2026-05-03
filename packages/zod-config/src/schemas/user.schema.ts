import { z } from 'zod';

export const updateNameSchema = z.object({
  name: z.string().min(2, 'Name too short'),
});

export const updateEmailSchema = z.object({
  email: z.string().email(),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});
