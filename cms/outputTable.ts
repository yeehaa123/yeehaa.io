import type {
  BaseEntity,
  AnalyzedEntity,
  AssociatedEntity,
  FinalEntity
} from "./entity";
import * as et from "./entity"
import { isArticle, isCourse } from "./entity/filters";

export type OutputTable =
  | BaseTable
  | AnalyzedTable
  | FinalTable;

export type BaseTable = BaseEntity[];
export type AnalyzedTable = AnalyzedEntity[];
export type AssociatedTable = AssociatedEntity[];
export type FinalTable = FinalEntity[];


export async function analyze(table: BaseTable) {
  console.log(`ANALYZING ${table.length} ENTITIES`)
  const promises = table.map(entity => et.analyze(entity))
  return await Promise.all(promises);
}

export function associate(table: AnalyzedTable) {
  console.log(`ASSOCIATING ${table.length} ENTITIES`)
  return table.map((entity) => {
    return et.associate(table, entity)
  })
}

export async function augment(table: AssociatedTable) {
  console.log(`AUGMENTING ${table.length} ENTITIES`)
  const promises = table.map(entity => et.augment(entity))
  return await Promise.all(promises);
}

export async function write(basePath: string, table: FinalTable) {
  for (const entity of table) {
    et.write(basePath, entity);
  }
}

export function findCourseForArticle(table: AnalyzedTable, title: string) {
  return table
    .filter(isCourse)
    .find(other => other.meta.habitat === title ||
      other.meta.title === title)
}

export function findArticleforCourse(table: AnalyzedTable, habitat: string) {
  return table
    .filter(isArticle)
    .find(other => other.meta.title === habitat)
}

export function findArticlesForAuthor(table: AnalyzedTable, author: string) {
  return table
    .filter(isArticle)
    .filter(other => other.meta.author === author)
}

export function findCoursesForAuthor(table: AnalyzedTable, author: string) {
  return table
    .filter(isCourse)
    .filter(other => other.meta.author === author)
}
