import type { BaseArticle, AnalyzedArticle, AssociatedArticle, FinalArticle } from "../article";
import type { BaseLanding, AnalyzedLanding, AssociatedLanding, FinalLanding } from "../landing";
import type { BaseProfile, AnalyzedProfile, AssociatedProfile, FinalProfile } from "../profile";
import type { BaseCourse, AssociatedCourse, AnalyzedCourse, FinalCourse } from "../course";
import type { AnalyzedSeries, AssociatedSeries, BaseSeries, FinalSeries, } from "../series/schema";
import type { BaseTag, AnalyzedTag, AssociatedTag, FinalTag } from "../tag/schema";
import { curatorSchema } from "@/offcourse/schema";
import { rawCourseSchema } from "cms/course/schema";
import { landingContentSchema } from "cms/landing/schema";
import { ContentType } from "cms/meta/schema";
import { z } from "zod";

const initSchema = z.object({
  title: z.string(),
  contentType: z.nativeEnum(ContentType),
  content: z.string().or(curatorSchema).or(rawCourseSchema).or(landingContentSchema),
  author: z.string(),
  seriesName: z.string().optional(),
})

export type InitEntity = z.infer<typeof initSchema>

export type BaseEntity =
  | BaseLanding
  | BaseCourse
  | BaseArticle
  | BaseProfile
  | BaseSeries
  | BaseTag

export type AnalyzedEntity =
  | AnalyzedLanding
  | AnalyzedCourse
  | AnalyzedProfile
  | AnalyzedArticle
  | AnalyzedSeries
  | AnalyzedTag

export type AssociatedEntity =
  | AssociatedLanding
  | AssociatedCourse
  | AssociatedProfile
  | AssociatedArticle
  | AssociatedSeries
  | AssociatedTag

export type FinalEntity =
  | FinalLanding
  | FinalCourse
  | FinalArticle
  | FinalProfile
  | FinalSeries
  | FinalTag

export type Entity =
  | BaseEntity
  | AnalyzedEntity
  | AssociatedEntity
  | FinalEntity;

