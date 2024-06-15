import type { Meta } from "../meta"
import { generateChecksum } from "../helpers";
import * as m from "../meta"
import { parse } from "yaml";

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
