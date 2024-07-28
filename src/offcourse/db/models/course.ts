import type { Course } from "@/offcourse/schema";
import { courseTable } from "../schema"
import { db } from "../";
import { createInsertSchema } from 'drizzle-zod';

export const insertCourse = async ({ course, courseId }: { course: Course, courseId: string }) => {
  const { curator } = course;
  await db.insert(courseTable).values({
    courseId,
    curator: curator.alias,
    course
  }).onConflictDoNothing()
  return courseId;
}


export const courseInsertSchema = createInsertSchema(courseTable);
