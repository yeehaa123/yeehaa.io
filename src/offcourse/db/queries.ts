import type { Action } from "@/offcourse/container/action";
import { db } from "./";
import { bookmarkInsertSchema, bookmarkTable, commandTable, courseTable } from "./schema";
import type { CourseQuery, Course } from "../schema";
import { eq } from "drizzle-orm";

export const getBookmarks = async () => {
  return await db.select().from(bookmarkTable).all();
}

export const insertCommand = async ({ type, payload }: Action) => {
  const createdAt = new Date()
  console.log("X", createdAt);
  // const value = commandInsertSchema.parse({ type, payload, createdAt });
  await db.insert(commandTable).values({ type, payload, createdAt });
  return createdAt;
}

export const insertCourse = async (course: Course) => {
  const { courseId, curator } = course;
  await db.insert(courseTable).values({
    courseId,
    curator: curator.alias,
    course
  }).onConflictDoNothing()
  return courseId;
}

export const insertBookmark = async (courseQuery: CourseQuery) => {
  const bookmarkedAt = new Date()
  const value = bookmarkInsertSchema.parse({ ...courseQuery, bookmarkedAt });
  await db.insert(bookmarkTable).values(value).onConflictDoNothing()
  return bookmarkedAt;
}

export const deleteBookmark = async (courseQuery: CourseQuery) => {
  try {
    await db.delete(bookmarkTable)
      .where(eq(bookmarkTable.courseId, courseQuery.courseId))
  } catch (e) {
    console.log("DELETE BOOKMARK ERROR", e);
  }
}
