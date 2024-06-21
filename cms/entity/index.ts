import type { BaseArticle, FinalArticle } from "../article";
import type { BaseProfile, FinalProfile } from "../profile";
import type { BaseCourse, FinalCourse } from "../course";
import type { InitEntity } from "./schema";
import * as article from "../article";
import * as course from "../course";
import * as profile from "../profile";
import * as people from "../people";
import * as filters from "./filters";

export type BaseEntity = BaseCourse | BaseArticle | BaseProfile
export type FinalEntity = FinalCourse | FinalArticle | FinalProfile

export type Entity = BaseEntity | FinalEntity;

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


export async function augment(entity: BaseEntity) {
  if (filters.isArticle(entity)) {
    return await article.augment(entity);
  }

  if (filters.isCourse(entity)) {
    return await course.augment(entity)
  }

  if (filters.isProfile(entity)) {
    return await profile.augment(entity);
  }

  throw ("INVALID ENTITY TYPE");
}

export async function write(basePath: string, entity: FinalEntity) {


  if (filters.isCourse(entity)) {
    await course.write(basePath, entity);
  }


  if (filters.isProfile(entity)) {
    await profile.write(basePath, entity);
    await people.write(basePath, entity);
  }

  if (filters.isArticle(entity)) {
    await article.write(basePath, entity);
  }

}
