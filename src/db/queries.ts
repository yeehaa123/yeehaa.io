import type { Action } from "@/offcourse/container/action";
import { db } from "./";
import { bookmarkTable, commandInsertSchema, commandTable } from "./schema";

export const result = await db.select().from(bookmarkTable).all();

export const insertCommand = async (command: Action) => {
  const createdAt = new Date()
  const value = commandInsertSchema.parse({ ...command, createdAt });
  await db.insert(commandTable).values(value);
}
