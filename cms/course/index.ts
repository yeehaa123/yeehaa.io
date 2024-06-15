import type { Meta } from "../meta"
import voca from "voca";
import { generateChecksum } from "../helpers";
import { writeFile } from 'fs/promises'
import * as path from 'path';
import * as m from "../meta"
import { parse, stringify } from "yaml";

export interface Checkpoint {
  task: string,
  href: string,
}

export interface Course {
  goal: string
  curator: string,
  habitat: string,
  description: string,
  checkpoints: Checkpoint[]
}

export interface CourseEntity {
  meta: Meta;
  course: Course
}

export async function init({ content }: { content: string }) {
  const checksum = generateChecksum(content);
  const course = await parse(content)
  const meta = m.init({
    checksum,
    contentType: m.ContentType.COURSE,
    author: course.curator,
    title: course.goal
  });
  return { meta, course };
}

export async function augment({ meta, course }: CourseEntity) {
  return { ...meta, ...course };
}

export async function write(basePath: string, course: Course) {
  const slug = `${voca.slugify(course.goal)}`;
  const filePath = path.join(basePath, "Courses", `${slug}.yaml`);
  const file = stringify(course);
  await writeFile(filePath, file, 'utf8');
}
