import type { UserRecord, CoursesQuery } from "@/offcourse/schema";
import { db } from "../";
import { bookmarkTable, completionTable, courseTable } from "../schema";
import { eq, inArray } from "drizzle-orm";

export const getUserRecords = async ({ courseIds }: CoursesQuery) => {
  const data = await db
    .select()
    .from(courseTable)
    .where(inArray(courseTable.courseId, courseIds))
    .leftJoin(bookmarkTable, eq(courseTable.courseId, bookmarkTable.courseId))
    .leftJoin(completionTable, eq(courseTable.courseId, courseTable.courseId))

  const records = data.reduce((acc, { bookmarked, completed }) => {
    const courseId = bookmarked?.courseId || completed?.courseId;
    if (courseId) {
      const userRecord = acc.get(courseId)
      const completedCheckpoint = completed?.checkpointId;
      if (!userRecord) {
        acc.set(courseId, {
          courseId,
          isBookmarked: !!bookmarked,
          isFollowed: !!completed,
          completed: completedCheckpoint ? [completedCheckpoint] : []
        })
      } else {
        acc.set(courseId, {
          ...userRecord,
          isFollowed: userRecord.isFollowed || !!completed,
          completed: completedCheckpoint
            ? [...userRecord.completed, completedCheckpoint]
            : userRecord.completed
        })
      }
    }
    return acc;
  }, new Map<string, UserRecord>)
  return [...records.values()]
}
