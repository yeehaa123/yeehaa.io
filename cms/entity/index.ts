import type { BaseArticle } from "../article";
import type { BaseProfile } from "../profile";
import type { CourseEntity } from "../course";
import type { InitEntity } from "./schema";
import * as article from "../article";
import * as m from "../meta";
import * as course from "../course";
import * as profile from "../profile";
import * as people from "../people";
import * as filters from "./filters";

export type Entity = CourseEntity | BaseArticle | BaseProfile

export async function init(initEntitity: InitEntity) {
  if (filters.isProfileFile(initEntitity)) {
    return profile.init(initEntitity)
  }

  if (filters.isMarkdownFile(initEntitity)) {
    return article.init(initEntitity)
  }

  if (filters.isOffcourseFile(initEntitity)) {
    return await course.init(initEntitity)
  }

  throw ("INVALID ENTITY")
}

export function associate(entity: Entity, other: Entity) {
  const meta = m.associate(entity.meta, other.meta)
  return meta && { ...entity, meta }
}

export async function write(basePath: string, entity: Entity) {
  if (filters.isNotDraft(entity)) {
    if (filters.isArticle(entity)) {
      const augmented = await article.augment(entity);
      await article.write(basePath, entity.meta.checksum, augmented);
    }

    if (filters.isCourse(entity)) {
      const augmented = await course.augment(entity)
      await course.write(basePath, augmented);
    }

    if (filters.isProfile(entity)) {
      const augmented = await profile.augment(entity);
      await profile.write(basePath, augmented);
      await people.write(basePath, augmented);
    }
  }
}
