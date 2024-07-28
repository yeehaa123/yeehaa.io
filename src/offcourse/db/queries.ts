import type { Action } from "@/offcourse/container/action";
import { db } from "./";
import { commandTable, } from "./schema";

export const insertCommand = async ({ type, payload }: Action) => {
  const createdAt = new Date()
  // const value = commandInsertSchema.parse({ type, payload, createdAt });
  await db.insert(commandTable).values({ type, payload, createdAt });
  return createdAt;
}

