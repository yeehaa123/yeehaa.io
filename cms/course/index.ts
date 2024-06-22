import { ContentType } from "../meta/schema"
import * as cp from "./checkpoint";
import * as ai from '../ai';
import { generateChecksum, hashify, slugify } from "../helpers";
import { writeFile } from 'fs/promises'
import * as path from 'path';
import * as m from "../meta"
import { stringify } from "yaml";
import { analyzedSchema, baseSchema, finalSchema, outputSchema } from "./schema"
import type { InitCourse, RawCourse, BaseCourse, FinalCourse, Course, AnalyzedCourse } from "./schema"

export type { RawCourse, BaseCourse, AnalyzedCourse, FinalCourse, Course }

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

export async function augment({ meta, analysis, course }: AnalyzedCourse) {
  const augmentations = analysis;
  return finalSchema.parse({ course, meta, analysis, augmentations })
}

export async function write(basePath: string, { meta, augmentations, course }: FinalCourse) {
  const { publicationData, author, id } = meta;
  const { goal } = course;
  const { tags, description, checkpoints } = augmentations;
  const habitat = meta.habitat && slugify(meta.habitat);
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
  const file = stringify(output);
  await writeFile(filePath, file, 'utf8');
}
