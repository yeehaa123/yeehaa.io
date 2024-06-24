import type { File, } from "./schema"
import { FileType } from "./schema"

export function isProfileFile({ fileName }: File) {
  return fileName === "profile";
}

export function isMarkdownFile({ fileType }: File) {
  return fileType === FileType.MARKDOWN;
}

export function isOffcourseFile({ fileType }: File) {
  return fileType === FileType.OFFCOURSE;
}
