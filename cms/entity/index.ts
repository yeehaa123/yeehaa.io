import type { BaseArticle, AnalyzedArticle, AssociatedArticle, FinalArticle } from "../article";
import type { BaseProfile, AnalyzedProfile, AssociatedProfile, FinalProfile } from "../profile";
import type { RawCourse, BaseCourse, AssociatedCourse, AnalyzedCourse, FinalCourse } from "../course";
import type { InitEntity } from "./schema";
import type { OutputTable } from "../outputTable";
import * as article from "../article";
import * as course from "../course";
import * as profile from "../profile";
import * as people from "../people";
import * as ot from "../outputTable";
import * as yaml from "yaml";
import { parseMarkdoc, parseMarkdown } from "../helpers";
import {
  isProfileFile,
  isMarkdownFile,
  isOffcourseFile,
  isCourse,
  isProfile,
  isArticle
} from "./filters";

export type BaseEntity = BaseCourse | BaseArticle | BaseProfile
export type AnalyzedEntity = AnalyzedCourse | AnalyzedProfile | AnalyzedArticle
export type AssociatedEntity = AssociatedCourse | AssociatedProfile | AssociatedArticle
export type FinalEntity = FinalCourse | FinalArticle | FinalProfile
export type Entity = BaseEntity | FinalEntity;

export async function init(initEntitity: InitEntity) {
  if (isProfileFile(initEntitity)) {
    const { item, author } = initEntitity;
    const { content, data } = parseMarkdown(item);
    return profile.init({ content, data, author })
  }

  if (isMarkdownFile(initEntitity)) {
    const { item, author, series } = initEntitity;
    const { title, content } = parseMarkdoc(item);
    if (!title) { throw ("ARTICLE NEEDS TITLE"); }
    return article.init({ title, article: content, author, series })
  }

  if (isOffcourseFile(initEntitity)) {
    const { item, author } = initEntitity;
    const content = await yaml.parse(item) as RawCourse;
    return course.init({ course: content, author })
  }
  throw ("INVALID ENTITY")
}


export async function analyze(entity: BaseEntity) {
  if (isProfile(entity)) {
    return await profile.analyze(entity);
  }

  if (isArticle(entity)) {
    return await article.analyze(entity)
  }

  if (isCourse(entity)) {
    return await course.analyze(entity)
  }

  throw ("INVALID ENTITY TYPE");
}

export function associate(entity: AnalyzedEntity, table: OutputTable) {
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

export async function augment(entity: AssociatedEntity) {
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
