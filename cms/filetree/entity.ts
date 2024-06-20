import type { BaseArticle } from "../article";
import type { BaseProfile } from "../profile";
import type { CourseEntity } from "../course";
import { ContentType, Status } from "../meta";
import * as article from "../article";
import * as course from "../course";
import * as profile from "../profile";
import * as people from "../people";

export type Entity = CourseEntity | BaseArticle | BaseProfile

export function isArticle(entity: Entity): entity is BaseArticle {
  return (entity as BaseArticle).meta.contentType === ContentType.ARTICLE;;
}

export function isCourse(entity: Entity): entity is CourseEntity {
  return (entity as CourseEntity).meta.contentType === ContentType.COURSE;;
}

export function isProfile(entity: Entity): entity is BaseProfile {
  return (entity as BaseProfile).meta.contentType === ContentType.PROFILE;;
}

export async function write(basePath: string, entry: Entity) {
  const { status, checksum } = entry.meta;
  if (status !== Status.DRAFT) {
    if (isArticle(entry)) {
      const augmented = await article.augment(entry);
      await article.write(basePath, checksum, augmented);
    } else if (isCourse(entry)) {
      const augmented = await course.augment(entry);
      await course.write(basePath, augmented);
    } else if (isProfile(entry)) {
      const augmented = await profile.augment(entry);
      await profile.write(basePath, augmented);
      await people.write(basePath, augmented);
    }
  }
}
