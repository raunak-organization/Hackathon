import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1),
  repoUrl: z
    .string()
    .url()
    .refine((url) => url.startsWith('https://github.com/'), {
      message: 'Only GitHub repositories are allowed',
    }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
