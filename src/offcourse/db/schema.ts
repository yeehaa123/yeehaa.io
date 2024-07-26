import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

import { createInsertSchema } from 'drizzle-zod';

export const bookmarkTable = sqliteTable("bookmarked", {
  courseId: text("courseId").notNull().unique(),
  bookmarkedAt: integer('bookmarked_at', { mode: 'timestamp' }).notNull()
});

export const completionTable = sqliteTable("completed", {
  courseId: text("course_id").notNull(),
  checkpointId: text("checkpoint_id").notNull().unique(),
  completedAt: integer('completed_at', { mode: 'timestamp' }).notNull()
});

export const courseTable = sqliteTable("course", {
  courseId: text("course_id").notNull().primaryKey(),
  curator: text("curator").notNull(),
  course: text('course', { mode: 'json' })
});

export const commandTable = sqliteTable("commands", {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  type: text('type').notNull(),
  payload: text('payload', { mode: 'json' })
});

export const commandInsertSchema = createInsertSchema(commandTable);
export const courseInsertSchema = createInsertSchema(courseTable);
