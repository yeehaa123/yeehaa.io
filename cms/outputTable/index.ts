import type {
  BaseEntity,
  AnalyzedEntity,
  AssociatedEntity,
  FinalEntity
} from "../entity";

import { limit } from "../helpers";

import * as et from "../entity"

export type OutputTable =
  | BaseTable
  | AnalyzedTable
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
  const promises = table.map(entity => {
    return limit(() => et.augment(entity))
  })
  return await Promise.all(promises);
}

export async function write(basePath: string, table: FinalTable) {
  for (const entity of table) {
    et.write(basePath, entity);
  }
}
