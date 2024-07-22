import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const bookmarkTable = sqliteTable("bookmarked", {
  courseId: text("courseId").notNull().unique(),
  bookmarkedAt: integer('bookmarked_at', { mode: 'timestamp' }).notNull()
});

export const courseTable = sqliteTable("course", {
  courseId: text("courseId").notNull().primaryKey(),
  curator: text("curator").notNull(),
  course: text('course', { mode: 'json' })
});

export const followTable = sqliteTable("followed", {
  courseId: text("courseId").notNull().unique(),
  followedAt: integer('followed_at', { mode: 'timestamp' }).notNull()
});

export const commandTable = sqliteTable("commands", {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  type: text('type').notNull(),
  payload: text('payload', { mode: 'json' })
});

export const bookmarkInsertSchema = createInsertSchema(bookmarkTable);
export const bookmarkSelectSchema = createSelectSchema(bookmarkTable);
export const commandInsertSchema = createInsertSchema(commandTable);
export const courseInsertSchema = createInsertSchema(courseTable);
