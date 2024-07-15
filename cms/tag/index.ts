import type { AnalyzedTable } from "cms/outputTable";
import type { AnalyzedTag, AssociatedTag, FinalTag } from "./schema";
import { ContentType, Status } from "../meta/schema"
import * as m from "../meta";
import * as ai from "./ai";
import * as as from "../association"
import * as ot from "../outputTable/filters";
import { writeFile } from 'fs/promises'
import * as yaml from "yaml";
import * as path from 'path';
import { generateChecksum, hashify, slugify } from "../helpers";
import { analyzedSchema, associatedSchema, finalSchema, outputSchema } from "./schema";

export const PATH_SUFFIX = "Tags"
export const schema = outputSchema;

export function init({ tagName }: { tagName: string }) {
  const id = hashify(JSON.stringify({ tagName }));
  const meta = m.init({
    id,
    title: tagName,
    status: Status.PUBLISHED,
    contentType: ContentType.TAG,
    checksum: generateChecksum(id)
  })
  const analysis = { tags: [] };
  return analyzedSchema.parse({ meta, tag: true, analysis });
}

export function associate(entity: AnalyzedTag, table: AnalyzedTable) {
  const articles = ot.findArticlesForTag(table, entity.meta.title);
  const courses = ot.findCoursesForTag(table, entity.meta.title);
  const associations = {
    articles: articles.map(as.init),
    courses: courses.map(as.init),
  };
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedTag) {
  const { meta, associations } = entity;
  const { title } = meta;
  const checksum = generateChecksum(JSON.stringify({ title, associations }));
  const { summary, excerpt } = await ai.analyze(entity, checksum);
  const augmentations = { summary, excerpt, checksum }
  return finalSchema.parse({ ...entity, augmentations })
}

export async function write(basePath: string, entity: FinalTag) {
  const { meta } = entity;
  const { title } = meta;
  const slug = slugify(title);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const dataFile = render(entity);
  await writeFile(dataFilePath, dataFile, 'utf8');
}

function render(entity: FinalTag) {
  const { meta, augmentations, associations } = entity;
  const { title } = meta;
  const articles = associations.articles.map(({ title }) => slugify(title));
  const courses = associations.courses.map(({ title }) => slugify(title));
  const output = outputSchema.parse({
    ...augmentations,
    title,
    articles,
    courses,
  })
  return yaml.stringify(output)
}

