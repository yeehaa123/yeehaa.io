import type { Meta } from "../meta/schema"
import { ContentType } from "../meta/schema"
import type { Course as CO } from "./course";
import * as c from "./course";
import * as cp from "./checkpoint";
import * as ai from '../ai';
import { generateChecksum, hashify, slugify } from "../helpers";
import { writeFile } from 'fs/promises'
import * as path from 'path';
import * as m from "../meta"
import { parse, stringify } from "yaml";

export const PATH_SUFFIX = "Courses"
export const schema = c.schema;

export interface RawCheckpoint {
  task: string,
  href: string,
}

export interface RawCourse {
  goal: string
  curator: string,
  habitat?: string,
  checkpoints: RawCheckpoint[]
}

export interface BaseCourse {
  meta: Meta;
  course: RawCourse
}

export interface FinalCourse {
  meta: Meta,
  course: CO
}

export type Course = BaseCourse | FinalCourse;

export async function init({ item, author }: { author: string, item: string }) {
  const checksum = generateChecksum(item);
  const course = await parse(item) as RawCourse;
  const { goal, curator, habitat } = course;
  let hash = hashify(JSON.stringify({ goal, curator }));
  const meta = m.init({
    checksum,
    habitat,
    contentType: ContentType.COURSE,
    author,
    title: course.goal,
    id: hash
  });
  return {
    meta,
    course
  }
}

export async function augment({ meta, course: old }: BaseCourse) {
  const { id, publicationData, author, title: goal, author: curator } = meta;
  const promises = old.checkpoints.map(checkpoint => {
    return cp.augment({ ...checkpoint, goal, curator });
  })
  const checkpoints = await Promise.all(promises);
  const { description } = await ai.course.analyze({ goal, checkpoints, id })
  const allTags = checkpoints.flatMap(({ tags }) => tags);
  const tags = [...new Set([...allTags])]
  const habitat = meta.habitat && slugify(meta.habitat);
  const course = c.schema.parse({
    goal,
    curator: author,
    habitat,
    courseId: id,
    ...publicationData,
    checkpoints,
    description,
    tags,
  });
  return {
    meta,
    course
  }
}

export async function write(basePath: string, { course }: FinalCourse) {
  const slug = slugify(course.goal);
  const filePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const file = stringify(course);
  await writeFile(filePath, file, 'utf8');
}
