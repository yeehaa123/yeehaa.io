import type { CheckpointQuery } from "../../schema";
import { db } from "../";
import { eq, and } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { completionTable } from "../schema"

export const insertCompletion = async (checkpointQuery: CheckpointQuery) => {
  const completedAt = new Date()
  const value = completionInsertSchema.parse({ ...checkpointQuery, completedAt });
  await db.insert(completionTable).values(value).onConflictDoNothing()
  return completedAt;
}

export const deleteCompletion = async (checkpointQuery: CheckpointQuery) => {
  try {
    await db.delete(completionTable)
      .where(and(
        eq(completionTable.courseId, checkpointQuery.courseId),
        eq(completionTable.checkpointId, checkpointQuery.checkpointId)
      ))
  } catch (e) {
    console.log("DELETE BOOKMARK ERROR", e);
  }
}

export const completionInsertSchema = createInsertSchema(completionTable);
export const completionSelectSchema = createSelectSchema(completionTable);
