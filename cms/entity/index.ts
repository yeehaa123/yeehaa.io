import type { RawCourse } from "../course";
import type { AnalyzedTable } from "../outputTable";
import type { Curator } from "@/offcourse/schema";
import type {
  InitEntity,
  BaseEntity,
  AnalyzedEntity,
  AssociatedEntity,
  FinalEntity,
  Entity
} from "./schema";
import { ContentType } from "cms/meta/schema";
import * as article from "../article";
import * as course from "../course";
import * as profile from "../profile";
import * as series from "../series";
import {
  isCourse,
  isProfile,
  isArticle,
  isSeries,
} from "./filters";

export async function init(initEntitity: InitEntity) {
  const { contentType, content, title, author, seriesName } = initEntitity;
  switch (contentType) {
    case ContentType.PROFILE: {
      return profile.init({ profile: content as Curator, author })
    }

    case ContentType.ARTICLE: {
      if (!title) { throw ("ARTICLE NEEDS TITLE"); }
      return article.init({ title, article: content as string, author, series: seriesName })
    }

    case ContentType.COURSE: {
      return course.init({ course: content as RawCourse, author })
    }

    case ContentType.SERIES: {
      return series.init({ series: seriesName!, author })
    }
  }
}

export async function analyze(entity: BaseEntity) {
  if (isProfile(entity)) { return await profile.analyze(entity); }
  if (isArticle(entity)) { return await article.analyze(entity); }
  if (isCourse(entity)) { return await course.analyze(entity) }
  if (isSeries(entity)) { return series.analyze(entity) }
  throw ("ANALYSIS RECEIVED INVALID ENTITY TYPE");
}

export function associate(table: AnalyzedTable, entity: AnalyzedEntity) {
  if (isCourse(entity)) { return course.associate(entity, table) }
  if (isArticle(entity)) { return article.associate(entity, table); }
  if (isProfile(entity)) { return profile.associate(entity, table); }
  if (isSeries(entity)) { return series.associate(entity, table) }
  throw ("ASSOCIATE RECEIVED INVALID ENTITY TYPE");
}

export async function augment(entity: AssociatedEntity) {
  if (isProfile(entity)) { return await profile.augment(entity); }
  if (isArticle(entity)) { return await article.augment(entity); }
  if (isCourse(entity)) { return await course.augment(entity) }
  if (isSeries(entity)) { return await series.augment(entity) }
  throw ("AUGMENT RECEIVED INVALID ENTITY TYPE");
}

export async function write(basePath: string, entity: FinalEntity) {
  if (isCourse(entity)) { await course.write(basePath, entity) }
  if (isArticle(entity)) { await article.write(basePath, entity); }
  if (isProfile(entity)) { await profile.write(basePath, entity); }
  if (isSeries(entity)) { await series.write(basePath, entity) }
}

export type { BaseEntity, AnalyzedEntity, AssociatedEntity, FinalEntity, Entity }
