import { z } from "zod";
import type { BaseEntity } from "../entity"

const fileSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  item: z.string(),
})

export type File = z.infer<typeof fileSchema>

export enum FileType {
  MARKDOWN = ".md",
  OFFCOURSE = ".offcourse"
}

export type FileTree = Map<string, BaseEntity>
