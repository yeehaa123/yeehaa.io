import type { UserRecord, CoursesQuery } from "@/offcourse/schema";
import { db } from "../";
import { bookmarkTable, completionTable, courseTable, noteTable } from "../schema";
import { eq, inArray } from "drizzle-orm";

export const getUserRecords = async ({ courseIds }: CoursesQuery) => {
  const data = await db
    .select()
    .from(courseTable)
    .where(inArray(courseTable.courseId, courseIds))
    .leftJoin(bookmarkTable, eq(bookmarkTable.courseId, courseTable.courseId))
    .leftJoin(completionTable, eq(completionTable.courseId, courseTable.courseId))
    .leftJoin(noteTable, eq(noteTable.courseId, courseTable.courseId))

  const records = data.reduce((acc, { course, bookmark, complete, note }) => {
    const { courseId } = course;
    if (courseId) {
      const userRecord = acc.get(courseId)
      if (!userRecord) {
        acc.set(courseId, {
          courseId,
          isBookmarked: !!bookmark,
          isFollowed: !!complete,
          completed: complete ? [complete.checkpointId] : [],
          notes: note ? [note] : []
        })
      } else {
        const completed = complete
          ? [...new Set([...userRecord.completed, complete.checkpointId])]
          : userRecord.completed;
        const existingNote = userRecord.notes.find(
          ({ annotatedAt }) => annotatedAt.getTime() === note?.annotatedAt.getTime()
        );
        const notes = (existingNote || !note)
          ? userRecord.notes
          : [...userRecord.notes, note];
        acc.set(courseId, {
          ...userRecord,
          isFollowed: userRecord.isFollowed || !!complete,
          completed,
          notes
        })
      }
    }
    return acc;
  }, new Map<string, UserRecord>)
  return [...records.values()]
}
