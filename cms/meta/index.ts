import type { MetaInit } from "./schema"
import * as pd from "./publicationData";
import * as filters from "./filters"
import { schema, Status } from "./schema"


export function init(metaInit: MetaInit) {
  const status = metaInit.status || Status.DRAFT;
  const meta = { ...metaInit, status }
  const publicationData = filters.isPublished(meta)
    ? pd.init(meta.publicationData)
    : undefined;
  return schema.parse({ ...meta, publicationData });
}
