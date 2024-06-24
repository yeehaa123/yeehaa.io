import type { Article } from "../article";
import type { Profile, } from "../profile";
import type { Course } from "../course";
import type { Series } from "../series";
import type { Entity } from "."
import * as mf from "../meta/filters";

export enum FileType {
  MARKDOWN = ".md",
  OFFCOURSE = ".offcourse"
}

export function isArticle(entity: Entity): entity is Article {
  const meta = (entity as Article).meta
  return mf.isArticle(meta)
}

export function isCourse(entity: Entity): entity is Course {
  const meta = (entity as Course).meta
  return mf.isCourse(meta);
}

export function isProfile(entity: Entity): entity is Profile {
  const meta = (entity as Profile).meta
  return mf.isProfile(meta);
}

export function isSeries(entity: Entity): entity is Series {
  const meta = (entity as Series).meta
  return mf.isSeries(meta);
}

export function isNotDraft({ meta }: Entity) {
  return mf.isNotDraft(meta);
}

export function hasHabitat(entity: Entity, other: Entity) {
  return mf.hasHabitat(entity.meta, other.meta);
}

export function isHabitat(entity: Entity, other: Entity) {
  return mf.isHabitat(entity.meta, other.meta);
}

export function hasSameAuthor(entity: Entity, other: Entity) {
  return mf.hasSameAuthor(entity.meta, other.meta);
}
