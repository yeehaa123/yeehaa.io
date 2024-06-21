import type { Entity, BaseEntity, FinalEntity } from "./entity";
import * as filters from "./meta/filters";
import * as et from "./entity"
import * as ot from "./outputTable"
import { isArticle, isCourse, isProfile } from "./entity/filters";

export type OutputTable = BaseEntity[];

export function findHabitatForCourse(table: OutputTable, entity: Entity) {
  const article = table.find(({ meta }) => filters.hasHabitat(entity.meta, meta));
  return article?.meta.title;
}

export function findCourseForHabitat(table: OutputTable, entity: Entity) {
  const course = table.find(({ meta }) => filters.isHabitat(entity.meta, meta));
  return course?.meta.title;
}

export function findArticlesByAuthor(table: OutputTable, entity: Entity) {
  const articles = table
    .filter(({ meta }) => filters.isArticle(meta))
    .filter(({ meta }) => filters.hasSameAuthor(entity.meta, meta))
    .map(({ meta }) => meta.title)
  const courses = table
    .filter(({ meta }) => filters.isCourse(meta))
    .filter(({ meta }) => filters.hasSameAuthor(entity.meta, meta))
    .map(({ meta }) => meta.title)
  return { articles, courses }
}

export function associate(table: OutputTable) {
  return table.map((entity) => {
    if (isCourse(entity)) {
      const habitat = ot.findHabitatForCourse(table, entity);
      return { ...entity, associations: { habitat } }
    }
    if (isProfile(entity)) {
      const associations = ot.findArticlesByAuthor(table, entity)
      return { ...entity, associations }
    }
    if (isArticle(entity)) {
      const course = ot.findCourseForHabitat(table, entity);
      return { ...entity, associations: { course } }
    }
    throw ("INVALID ENTITY TYPE");
  })
}

export async function augment(table: OutputTable) {
  const promises = table.map(entity => et.augment(entity))
  return await Promise.all(promises);
}

export async function write(basePath: string, table: FinalEntity[]) {
  for (const entity of table) {
    et.write(basePath, entity);
  }
}
