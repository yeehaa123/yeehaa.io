import { db } from "./";
import { bookmarkTable } from "./schema";

export const result = await db.select().from(bookmarkTable).all();
