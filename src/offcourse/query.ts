import { z } from "zod";
import { courseQuery, coursesQuery } from "./schema";

export enum QueryType {
  FETCH_USER_RECORDS = "FETCH_USER_RECORDS",
  FETCH_USER_RECORD = "FETCH_USER_RECORD"
}

export const querySchema = z.union([
  z.object({ type: z.literal(QueryType.FETCH_USER_RECORDS), payload: coursesQuery }),
  z.object({ type: z.literal(QueryType.FETCH_USER_RECORD), payload: courseQuery }),
])

export type Query = z.infer<typeof querySchema>
