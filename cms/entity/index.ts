import type { BaseArticle, FinalArticle } from "../article";
import type { BaseProfile, FinalProfile } from "../profile";
import type { BaseCourse, FinalCourse } from "../course";
import type { InitEntity } from "./schema";
import type { OutputTable } from "../outputTable";
import * as article from "../article";
import * as course from "../course";
import * as profile from "../profile";
import * as people from "../people";
import * as ot from "../outputTable";
import { parseMarkdoc } from "../helpers";
import {
  isProfileFile,
  isMarkdownFile,
  isOffcourseFile,
  isCourse,
  isProfile,
  isArticle
} from "./filters";

export type BaseEntity = BaseCourse | BaseArticle | BaseProfile
export type FinalEntity = FinalCourse | FinalArticle | FinalProfile
export type Entity = BaseEntity | FinalEntity;

export async function init(initEntitity: InitEntity) {
  if (isProfileFile(initEntitity)) {
    return profile.init(initEntitity)
  }

  if (isMarkdownFile(initEntitity)) {
    const { item, author, series } = initEntitity;
    const { title, content } = parseMarkdoc(item);
    if (!title) { throw ("ARTICLE NEEDS TITLE"); }
    return article.init({ title, content, author, series })
  }

  if (isOffcourseFile(initEntitity)) {
    return await course.init(initEntitity)
  }

  throw ("INVALID ENTITY")
}

export function associate(entity: BaseEntity, table: OutputTable) {
  if (isArticle(entity)) {
    const course = ot.findCourseForHabitat(table, entity);
    const associations = { course }
    return { ...entity, associations }
  }
  if (isCourse(entity)) {
    const habitat = ot.findHabitatForCourse(table, entity);
    const associations = { habitat }
    return { ...entity, associations }
  }
  if (isProfile(entity)) {
    const associations = ot.findByAuthor(table, entity)
    return { ...entity, associations }
  };
  throw ("INVALID ENTITY TYPE");
}


export async function augment(entity: BaseEntity) {
  if (isProfile(entity)) {
    return await profile.augment(entity);
  }

  if (isArticle(entity)) {
    return await article.augment(entity);
  }

  if (isCourse(entity)) {
    return await course.augment(entity)
  }

  throw ("INVALID ENTITY TYPE");
}

export async function write(basePath: string, entity: FinalEntity) {
  if (isCourse(entity)) {
    await course.write(basePath, entity);
  }

  if (isProfile(entity)) {
    await profile.write(basePath, entity);
    await people.write(basePath, entity);
  }

  if (isArticle(entity)) {
    await article.write(basePath, entity);
  }

}
