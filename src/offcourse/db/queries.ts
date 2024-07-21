import type { Action } from "@/offcourse/container/action";
import { db } from "./";
import { bookmarkInsertSchema, bookmarkTable, commandInsertSchema, commandTable } from "./schema";
import type { CourseQuery } from "../schema";
import { eq } from "drizzle-orm";

export const getBookmarks = async () => {
  return await db.select().from(bookmarkTable).all();
}

export const insertCommand = async (command: Action) => {
  const createdAt = new Date()
  const value = commandInsertSchema.parse({ ...command, createdAt });
  await db.insert(commandTable).values(value);
  return createdAt;
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
