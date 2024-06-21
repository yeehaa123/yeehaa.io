import type { Meta, MetaInit } from "./schema"
import * as pd from "./publicationData";
import * as filters from "./filters"
import { schema, Status } from "./schema"

export function validate(frontmatter: Meta) {
  return schema.parse(frontmatter);
}

export function updateHabitat(meta: Meta, habitat?: Meta) {
  return {
    ...meta,
    habitat: habitat?.title
  }
}

export function updateCourse(meta: Meta, course?: Meta) {
  return {
    ...meta,
    course: course?.title
  }
}

export function init(metaInit: MetaInit) {
  const status = metaInit.status || Status.DRAFT;
  const meta = { ...metaInit, status }
  if (filters.isPublished(meta)) {
    const publicationData = pd.init(meta.publicationData);
    return validate({ ...meta, publicationData });
  }
  return validate(meta);
}
