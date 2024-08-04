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
import * as ai from './ai';
import { generateChecksum, hashify, slugify } from "../helpers";
import { writeFile } from 'fs/promises'
import * as path from 'path';
import * as m from "../meta"
import * as ot from "../outputTable/filters"
import * as yaml from "yaml";
import * as cp from "../checkpoint";
import * as as from "../association";
import { analyzedSchema, associatedSchema, baseSchema, finalSchema, outputSchema } from "./schema"
import { limit } from "../helpers";

export const PATH_SUFFIX = "Courses"
export const schema = outputSchema

export function init({ title, course: raw, author, series }: InitCourse) {
  const curator = author;
  const { habitat } = raw;
  const goal = title;
  const courseId = hashify(JSON.stringify({ goal, curator }));
  const meta = m.init({
    id: courseId,
    author,
    series,
    title: goal,
    contentType: ContentType.COURSE,
    habitat,
    checksum: generateChecksum(JSON.stringify(raw)),
  });
  const checkpoints = raw.checkpoints.map(checkpoint => cp.init({ ...checkpoint, goal, curator }));
  const course = { courseId, goal, curator, checkpoints };
  return baseSchema.parse({ meta, course })
}

export async function analyze(entity: BaseCourse) {
  const { course } = entity;
  const { goal } = course;
  const promises = course.checkpoints.map(checkpoint => {
    return limit(() => cp.analyze({ ...checkpoint, goal }));
  })
  const checkpoints = await Promise.all(
    promises
  );
  const { description } = await ai.analyzeCourse(course)
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
  const habitat = ot.findArticleForCourse(table, entity.meta.habitat || entity.meta.title);
  const profile = ot.findProfileForAuthor(table, entity.course.curator);
  const associations = {
    habitat: habitat ? as.init(habitat) : undefined,
    profile: profile ? as.init(profile) : undefined
  }
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedCourse) {
  const { analysis } = entity;
  const augmentations = analysis;
  return finalSchema.parse({ ...entity, augmentations })
}

export async function write(basePath: string, entity: FinalCourse) {
  const { meta, associations, augmentations, course } = entity
  const { publicationData, id, series } = meta;
  const { goal } = course;
  const curator = associations.profile?.profile
  const { tags, description, checkpoints } = augmentations;
  const habitat = associations.habitat?.title && slugify(associations.habitat.title);
  const output = outputSchema.parse({
    goal,
    series,
    curator,
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
