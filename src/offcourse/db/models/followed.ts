import type { CourseQuery, CoursesQuery } from "@/offcourse/schema";
import { db } from "../";
import { eq, inArray } from "drizzle-orm";
import { followTable } from "../schema"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';


export const getFollows = async ({ courseIds }: CoursesQuery) => {
  console.log(courseIds);
  return await db
    .select()
    .from(followTable)
    .where(inArray(followTable.courseId, courseIds))
    .all();
}

export const insertFollow = async (courseQuery: CourseQuery) => {
  const followededAt = new Date()
  const value = followInsertSchema.parse({ ...courseQuery, followededAt });
  await db.insert(followTable).values(value).onConflictDoNothing()
  return followededAt;
}

export const deleteFollow = async (courseQuery: CourseQuery) => {
  try {
    await db.delete(followTable)
      .where(eq(followTable.courseId, courseQuery.courseId))
  } catch (e) {
    console.log("DELETE BOOKMARK ERROR", e);
  }
}

export const followInsertSchema = createInsertSchema(followTable);
export const followSelectSchema = createSelectSchema(followTable);
