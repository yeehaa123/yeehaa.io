import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const bookmarkTable = sqliteTable("bookmarks", {
  courseId: text("courseId").notNull(),
  userName: text("userName").notNull(),
  bookmarkedAt: integer('bookmarked_at', { mode: 'timestamp' }),

});

export const fooInsertSchema = createInsertSchema(bookmarkTable);
export const fooSelectSchema = createSelectSchema(bookmarkTable);

