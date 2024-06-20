import type { Meta, MetaInit } from "./schema";
import { ContentType, Status } from "./schema";

export function isProfile(meta: Meta) {
  return meta.contentType === ContentType.PROFILE;;
}

export function hasSameAuthor(meta: Meta, other: Meta) {
  return meta.author === other.author;
}

export function isAuthor(meta: Meta, other: Meta) {
  return isProfile(meta) && isNotProfile(other) && hasSameAuthor(meta, other);
}

export function hasSameTitle(meta: Meta, other: Meta) {
  return meta.title === other.title;
}

export function isHabitat(meta: Meta, other: Meta) {
  return isArticle(meta)
    && isCourse(other)
    && (hasSameTitle(meta, other) || other.habitat === meta.title)
}

export function hasHabitat(meta: Meta, other: Meta) {
  return isCourse(meta) && isArticle(other) &&
    (hasSameTitle(meta, other) || meta.habitat === other.title)
}

export function isPublished(meta: Meta | MetaInit) {
  return meta.status === Status.PUBLISHED
}

export function isNotProfile(meta: Meta) {
  return meta.contentType !== ContentType.PROFILE;;
}

export function isArticle(meta: Meta) {
  return meta.contentType === ContentType.ARTICLE;;
}

export function isCourse(meta: Meta) {
  return meta.contentType === ContentType.COURSE;;
}

export function isNotDraft(meta: Meta) {
  return meta.status !== Status.DRAFT;
}
