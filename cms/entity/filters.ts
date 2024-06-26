import type { Article } from "../article";
import type { Profile, } from "../profile";
import type { Course } from "../course";
import type { Series } from "../series";
import type { Entity } from "."
import { ContentType, Status } from "../meta/schema";

export enum FileType {
  MARKDOWN = ".md",
  OFFCOURSE = ".offcourse"
}

export function isArticle(entity: Entity): entity is Article {
  const meta = (entity as Article).meta
  return meta.contentType === ContentType.ARTICLE;;
}

export function isCourse(entity: Entity): entity is Course {
  const meta = (entity as Course).meta
  return meta.contentType === ContentType.COURSE;
}

export function isProfile(entity: Entity): entity is Profile {
  const meta = (entity as Profile).meta
  return meta.contentType === ContentType.PROFILE;;
}

export function isSeries(entity: Entity): entity is Series {
  const meta = (entity as Series).meta
  return meta.contentType === ContentType.SERIES;;
}

export function isNotDraft({ meta }: Entity) {
  return meta.status !== Status.DRAFT;
}
