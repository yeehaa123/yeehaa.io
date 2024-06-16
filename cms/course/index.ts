import type { Meta } from "../meta"
import type { Course } from "./course";
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

export interface BaseCheckpoint {
  task: string,
  href: string,
}

export interface BaseCourse {
  goal: string
  curator: string,
  habitat?: string,
  checkpoints: BaseCheckpoint[]
}

export interface CourseEntity {
  meta: Meta;
  course: BaseCourse
}

export async function init({ content, author }: { author: string, content: string }) {
  const checksum = generateChecksum(content);
  const course = await parse(content) as BaseCourse;
  const { goal, curator, habitat } = course;
  let hash = hashify(JSON.stringify({ goal, curator }));
  const meta = m.init({
    checksum,
    habitat,
    contentType: m.ContentType.COURSE,
    author,
    title: course.goal,
    id: hash
  });
  const checkpoints = course.checkpoints.map(checkpoint => cp.init({ ...checkpoint, goal, curator }))
  return {
    meta, course: { ...course, checkpoints }
  }
}

export async function augment({ meta, course: old }: CourseEntity) {
  const { id, publicationData, author } = meta;
  const { goal } = old;
  const promises = old.checkpoints.map(checkpoint => {
    return cp.augment({ ...checkpoint, goal: old.goal });
  })
  const checkpoints = await Promise.all(promises);
  const { description } = await ai.course.analyze({ goal, checkpoints, id })
  const allTags = checkpoints.flatMap(({ tags }) => tags);
  const tags = [...new Set([...allTags])]
  const habitat = meta.habitat && slugify(meta.habitat);
  const course = {
    goal,
    curator: author,
    habitat,
    courseId: id,
    ...publicationData,
    checkpoints,
    description,
    tags,
  };
  return c.init(course);
}

export async function write(basePath: string, course: Course) {
  const slug = slugify(course.goal);
  const filePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const file = stringify(course);
  await writeFile(filePath, file, 'utf8');
}
