import type { RawCourse } from "../course";
import type { AnalyzedTable } from "../outputTable";
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
import * as tag from "../tag";
import * as landing from "../landing";
import {
  isCourse,
  isProfile,
  isArticle,
  isSeries,
  isTag,
  isLanding,
} from "./filters";
import type { Curator } from "@/offcourse/schema";
import type { LandingContent } from "cms/landing/schema";


export function init(initEntitity: InitEntity) {
  const { contentType, content, title, author, seriesName } = initEntitity;
  switch (contentType) {
    case ContentType.ARTICLE: {
      return article.init({ title, article: content as string, author, series: seriesName })
    }

    case ContentType.LANDING_PAGE: {
      return landing.init({ page_content: content as LandingContent, author })
    }

    case ContentType.COURSE: {
      return course.init({ title, course: content as RawCourse, author, series: seriesName })
    }


    case ContentType.PROFILE: {
      return profile.init({ profile: content as Curator, author })
    }



    case ContentType.SERIES: {
      return series.init({ series: seriesName!, author })
    }
    default: throw ("INVALID ENTITY TYPE");
  }
}

export async function analyze(entity: BaseEntity) {
  if (isLanding(entity)) { return await landing.analyze(entity); }
  if (isProfile(entity)) { return await profile.analyze(entity); }
  if (isArticle(entity)) { return await article.analyze(entity); }
  if (isCourse(entity)) { return await course.analyze(entity) }
  throw ("ANALYSIS RECEIVED INVALID ENTITY TYPE");
}

export function associate(table: AnalyzedTable, entity: AnalyzedEntity) {
  if (isLanding(entity)) { return landing.associate(entity, table); }
  if (isCourse(entity)) { return course.associate(entity, table) }
  if (isArticle(entity)) { return article.associate(entity, table); }
  if (isProfile(entity)) { return profile.associate(entity, table); }
  if (isSeries(entity)) { return series.associate(entity, table) }
  if (isTag(entity)) { return tag.associate(entity, table) }
  throw ("ASSOCIATE RECEIVED INVALID ENTITY TYPE");
}

export async function augment(entity: AssociatedEntity) {
  if (isLanding(entity)) { return await landing.augment(entity); }
  if (isProfile(entity)) { return await profile.augment(entity); }
  if (isArticle(entity)) { return await article.augment(entity); }
  if (isCourse(entity)) { return await course.augment(entity) }
  if (isSeries(entity)) { return await series.augment(entity) }
  if (isTag(entity)) { return await tag.augment(entity) }
  throw ("AUGMENT RECEIVED INVALID ENTITY TYPE");
}

export async function write(basePath: string, entity: FinalEntity) {
  if (isLanding(entity)) { await landing.write(basePath, entity) }
  if (isCourse(entity)) { await course.write(basePath, entity) }
  if (isArticle(entity)) { await article.write(basePath, entity); }
  if (isProfile(entity)) { await profile.write(basePath, entity); }
  if (isSeries(entity)) { await series.write(basePath, entity) }
  if (isTag(entity)) { await tag.write(basePath, entity) }
}

export type { BaseEntity, AnalyzedEntity, AssociatedEntity, FinalEntity, Entity }
