import type {
  Course,
  InitCourse,
  RawCourse,
  AnalyzedCourse,
  AssociatedCourse,
  BaseCourse,
  FinalCourse,
} from "./schema"
import type { AnalyzedTable } from "../outputTable";
import { ContentType } from "../meta/schema"
import * as cp from "./checkpoint";
import * as ai from '../ai';
import { generateChecksum, hashify, slugify } from "../helpers";
import { writeFile } from 'fs/promises'
import * as path from 'path';
import * as m from "../meta"
import * as ot from "../outputTable"
import * as yaml from "yaml";
import * as as from "../association";
import { analyzedSchema, associatedSchema, baseSchema, finalSchema, outputSchema } from "./schema"

export const PATH_SUFFIX = "Courses"
export const schema = outputSchema

export function init({ course: raw, author }: InitCourse) {
  const course = { ...raw, curator: author };
  const { goal, curator, habitat } = course;
  const meta = m.init({
    id: hashify(JSON.stringify({ goal, curator })),
    title: goal,
    contentType: ContentType.COURSE,
    author,
    habitat,
    checksum: generateChecksum(JSON.stringify(course)),
  });
  return baseSchema.parse({ meta, course })
}

export async function analyze(entity: BaseCourse) {
  const { meta, course } = entity;
  const { id } = meta;
  const { goal, curator } = course;
  const promises = course.checkpoints.map(checkpoint => {
    return cp.augment({ ...checkpoint, goal, curator });
  })
  const checkpoints = await Promise.all(promises);
  const { description } = await ai.course.analyze({ goal, checkpoints, id })
  const allTags = checkpoints.flatMap(({ tags }) => tags);
  const tags = [...new Set([...allTags])]
  const analysis = {
    description,
    tags,
    checkpoints
  }
  return analyzedSchema.parse({ ...entity, analysis })
}

export function associate(entity: AnalyzedCourse, table: AnalyzedTable) {
  const habitat = ot.findArticleforCourse(table, entity.meta.habitat || entity.meta.title);
  const associations = { habitat: habitat ? as.init(habitat) : undefined }
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedCourse) {
  const { analysis } = entity;
  const augmentations = analysis;
  return finalSchema.parse({ ...entity, augmentations })
}

export async function write(basePath: string, entity: FinalCourse) {
  const { meta, associations, augmentations, course } = entity
  const { publicationData, author, id } = meta;
  const { goal } = course;
  const { tags, description, checkpoints } = augmentations;
  const habitat = associations.habitat?.title && slugify(associations.habitat.title);
  const output = outputSchema.parse({
    goal,
    curator: author,
    habitat,
    courseId: id,
    ...publicationData,
    checkpoints,
    description,
    tags,
  });
  const slug = slugify(goal);
  const filePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const file = yaml.stringify(output);
  await writeFile(filePath, file, 'utf8');
}

export type {
  RawCourse,
  BaseCourse,
  AnalyzedCourse,
  AssociatedCourse,
  FinalCourse,
  Course
}
