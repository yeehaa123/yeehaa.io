import type { TableRow } from "../table/tableRow";
import { generateChecksum } from "../helpers";
import * as tr from "../table/tableRow";
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
  meta: TableRow;
  course: Course
}

export async function init({ content }: { content: string }) {
  const checksum = generateChecksum(content);
  const course = await parse(content) as Course;
  const meta = tr.init({
    checksum,
    contentType: tr.ContentType.COURSE,
    author: course.curator,
    title: course.goal
  });
  return { meta, course };
}
