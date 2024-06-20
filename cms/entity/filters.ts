import type { BaseArticle } from "../article";
import type { BaseProfile } from "../profile";
import type { Entity } from "."
import type { CourseEntity } from "../course";
import { ContentType } from "../meta";

export function isArticle(entity: Entity | undefined): entity is BaseArticle {
  return (entity as BaseArticle).meta.contentType === ContentType.ARTICLE;;
}

export function isCourse(entity: Entity | undefined): entity is CourseEntity {
  return (entity as CourseEntity).meta.contentType === ContentType.COURSE;;
}

export function isProfile(entity: Entity | undefined): entity is BaseProfile {
  return (entity as BaseProfile).meta.contentType === ContentType.PROFILE;;
}

