import type { BaseArticle } from "../article";
import type { BaseProfile } from "../profile";
import type { Entity } from "."
import type { InitEntity } from "./schema"
import type { CourseEntity } from "../course";
import { ContentType } from "../meta/schema";
import * as mf from "../meta/filters";

export enum FileType {
  MARKDOWN = ".md",
  OFFCOURSE = ".offcourse"
}

export function isArticle(entity: Entity | undefined): entity is BaseArticle {
  return (entity as BaseArticle).meta.contentType === ContentType.ARTICLE;;
}

export function isCourse(entity: Entity | undefined): entity is CourseEntity {
  return (entity as CourseEntity).meta.contentType === ContentType.COURSE;;
}

export function isProfile(entity: Entity | undefined): entity is BaseProfile {
  return (entity as BaseProfile).meta.contentType === ContentType.PROFILE;;
}

export function isProfileFile({ fileName }: InitEntity) {
  return fileName === "profile";
}

export function isMarkdownFile({ fileType }: InitEntity) {
  return fileType === FileType.MARKDOWN;
}

export function isOffcourseFile({ fileType }: InitEntity) {
  return fileType === FileType.OFFCOURSE;
}

export function isNotDraft({ meta }: Entity) {
  return mf.isNotDraft(meta);
}
