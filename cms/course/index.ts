import type { Meta } from "../meta"
import type { Course } from "./course";
import * as c from "./course";
import * as cp from "./checkpoint";
import * as ai from '../ai';
import voca from "voca";
import { generateChecksum } from "../helpers";
import { createHash } from 'crypto';
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

export async function init({ content }: { content: string }) {
  const checksum = generateChecksum(content);
  const course = await parse(content)
  const { goal, curator } = course;
  let hash = createHash('md5').update(JSON.stringify({ goal, curator })).digest("hex")
  const meta = m.init({
    checksum,
    contentType: m.ContentType.COURSE,
    curator: course.curator,
    goal: course.goal,
    id: hash
  });
  return { meta, course };
}

export async function augment({ meta, course: old }: CourseEntity) {
  const { goal } = old;
  const promises = old.checkpoints.map(checkpoint => {
    return cp.augment({ ...checkpoint, goal: old.goal });
  })
  const checkpoints = await Promise.all(promises);
  const { description } = await ai.course.analyze({
    goal, checkpoints, id: meta.id
  })
  const allTags = checkpoints.flatMap(({ tags }) => tags);
  const tags = [...new Set([...allTags])]
  const habitat = old.habitat ? `${voca.slugify(old.habitat)}` : undefined;
  const course = { ...meta, ...old, checkpoints, description, tags, habitat, courseId: meta.id };
  return c.init(course);
}

export async function write(basePath: string, course: Course) {
  const slug = `${voca.slugify(course.goal)}`;
  const filePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const file = stringify(course);
  await writeFile(filePath, file, 'utf8');
}
