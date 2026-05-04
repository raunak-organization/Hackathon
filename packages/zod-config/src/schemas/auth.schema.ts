import { z } from 'zod';
import { PASSWORD_REGEX } from '../constants/regex';

const emailSchema = z
  .string()
  .email('Invalid email format')
  .trim()
  .toLowerCase();

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((val) => PASSWORD_REGEX.test(val), {
    message:
      'Password must include uppercase, lowercase, number and special character',
  });

export const registerUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  pendingEmail: z.string().email().optional(),
  password: passwordSchema,
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
