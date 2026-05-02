import { z } from 'zod';

export const createDeploySchema = z.object({
  projectId: z.string().min(1),
  env: z.record(z.string(), z.string()).optional().default({}),
});

export type CreateDeployInput = z.infer<typeof createDeploySchema>;
