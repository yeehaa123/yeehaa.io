import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const bookmarkTable = sqliteTable("bookmarks", {
  courseId: text("courseId").notNull(),
  bookmarkedAt: integer('bookmarked_at', { mode: 'timestamp' }).notNull()
});

export const commandTable = sqliteTable("commands", {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  type: text('type').notNull(),
  payload: text('payload', { mode: 'json' })
});

export const bookmarkInsertSchema = createInsertSchema(bookmarkTable);
export const bookmarkSelectSchema = createSelectSchema(bookmarkTable);
export const commandInsertSchema = createInsertSchema(commandTable);
