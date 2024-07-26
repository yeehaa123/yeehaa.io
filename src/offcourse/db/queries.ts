import type { Action } from "@/offcourse/container/action";
import { db } from "./";
import { commandTable, courseTable } from "./schema";
import type { Course } from "../schema";

export const insertCommand = async ({ type, payload }: Action) => {
  const createdAt = new Date()
  // const value = commandInsertSchema.parse({ type, payload, createdAt });
  await db.insert(commandTable).values({ type, payload, createdAt });
  return createdAt;
}

export const insertCourse = async ({ course, courseId }: { course: Course, courseId: string }) => {
  const { curator } = course;
  await db.insert(courseTable).values({
    courseId,
    curator: curator.alias,
    course
  }).onConflictDoNothing()
  return courseId;
}

