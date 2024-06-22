import type {
  Course,
  InitCourse,
  RawCourse,
  AnalyzedCourse,
  AssociatedCourse,
  BaseCourse,
  FinalCourse,
} from "./schema"
import { ContentType } from "../meta/schema"
import * as cp from "./checkpoint";
import * as ai from '../ai';
import { generateChecksum, hashify, slugify } from "../helpers";
import { writeFile } from 'fs/promises'
import * as path from 'path';
import * as m from "../meta"
import * as yaml from "yaml";
import { analyzedSchema, baseSchema, finalSchema, outputSchema } from "./schema"


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

export async function analyze({ meta, course }: BaseCourse) {
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
  return analyzedSchema.parse({ course, meta, analysis })
}

export async function augment({ analysis, ...entity }: AssociatedCourse) {
  const augmentations = analysis;
  return finalSchema.parse({ ...entity, analysis, augmentations })
}

export async function write(basePath: string, { meta, associations, augmentations, course }: FinalCourse) {
  const { publicationData, author, id } = meta;
  const { goal } = course;
  const { tags, description, checkpoints } = augmentations;
  const habitat = associations.habitat && slugify(associations.habitat);
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
