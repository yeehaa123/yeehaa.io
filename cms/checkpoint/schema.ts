import { z } from 'zod';
import { checkpointSchema } from "@/offcourse/schema";

export const initSchema = z.object({
  goal: z.string(),
  curator: z.string(),
  task: z.string(),
  href: z.string(),
})

export const baseCheckpointSchema = z.object({
  checkpointId: z.string(),
  goal: z.string(),
  curator: z.string(),
  task: z.string(),
  href: z.string(),
})

export { checkpointSchema }

export type InitCheckpoint = z.infer<typeof initSchema>
export type Checkpoint = z.infer<typeof checkpointSchema>;
export type BaseCheckpoint = z.infer<typeof baseCheckpointSchema>;
