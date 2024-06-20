import * as pd from "./publicationData";
import * as filters from "./filters"
import type { Meta, MetaInit } from "./schema"
import { schema, Status } from "./schema"

export function validate(frontmatter: Meta) {
  return schema.parse(frontmatter);
}

export function associate(meta: Meta, other: Meta) {
  if (filters.isHabitat(meta, other)) {
    return { ...meta, course: meta.title }
  }
  if (filters.hasHabitat(meta, other)) {
    return { ...meta, habitat: meta.title }
  }
  return false;
}

export function init(metaInit: MetaInit) {
  const status = metaInit.status || Status.DRAFT;
  if (status === Status.PUBLISHED) {
    return validate({
      ...metaInit,
      status,
      publicationData: pd.init(metaInit.publicationData)
    });
  } else {
    const status = Status.DRAFT;
    return validate({
      ...metaInit,
      status
    });
  }
}
