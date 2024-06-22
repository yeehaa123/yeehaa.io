import { z } from "zod";

const initSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  item: z.string(),
  author: z.string(),
  series: z.string().optional()
})

export type InitEntity = z.infer<typeof initSchema>
