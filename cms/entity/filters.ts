import type { Article } from "../article";
import type { Profile, } from "../profile";
import type { Course } from "../course";
import type { Entity } from "."
import type { InitEntity } from "./schema"
import { ContentType } from "../meta/schema";
import * as mf from "../meta/filters";

export enum FileType {
  MARKDOWN = ".md",
  OFFCOURSE = ".offcourse"
}

export function isArticle(entity: Entity): entity is Article {
  return (entity as Article).meta.contentType === ContentType.ARTICLE;
}

export function isCourse(entity: Entity): entity is Course {
  return (entity as Course).meta.contentType === ContentType.COURSE;
}

export function isProfile(entity: Entity): entity is Profile {
  return (entity as Profile).meta.contentType === ContentType.PROFILE;
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
