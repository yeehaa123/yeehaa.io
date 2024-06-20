import type { BaseArticle } from "../article";
import type { BaseProfile } from "../profile";
import type { CourseEntity } from "../course";
import { ContentType, Status } from "../meta";
import * as article from "../article";
import * as m from "../meta";
import * as course from "../course";
import * as profile from "../profile";
import * as people from "../people";
import { z } from "zod";

export type Entity = CourseEntity | BaseArticle | BaseProfile

export enum FileType {
  MARKDOWN = ".md",
  OFFCOURSE = ".offcourse"
}

const schema = z.object({
  fileName: z.string(),
  fileType: z.nativeEnum(FileType),
  item: z.string(),
  author: z.string(),
  series: z.string().optional()
})


export function isArticle(entity: Entity | undefined): entity is BaseArticle {
  return (entity as BaseArticle).meta.contentType === ContentType.ARTICLE;;
}

export function isCourse(entity: Entity | undefined): entity is CourseEntity {
  return (entity as CourseEntity).meta.contentType === ContentType.COURSE;;
}

export function isProfile(entity: Entity | undefined): entity is BaseProfile {
  return (entity as BaseProfile).meta.contentType === ContentType.PROFILE;;
}

type InitEntity = z.infer<typeof schema>

export async function init({ fileName, fileType, item, author, series }: InitEntity) {
  if (fileName === "profile") {
    return profile.init({ item, author })
  }
  if (fileType === FileType.MARKDOWN) {
    return article.init({ series, author, item })
  } else if (fileType === FileType.OFFCOURSE) {
    return await course.init({ author, item })
  }
  throw ("INVALID ENTITY")
}

export function associate(entity: Entity, other: Entity) {
  if (entity && other) {
    const meta = m.associate(entity.meta, other.meta);
    if (meta) {
      return {
        ...entity,
        meta,
      }
    }
  }
  return false
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
