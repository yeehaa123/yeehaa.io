import { z } from "zod";
import { coursesQuery } from "./schema";

export enum QueryType {
  FETCH_USER_RECORDS = "FETCH_USER_RECORDS"
}

export const querySchema =
  z.object({ type: z.literal(QueryType.FETCH_USER_RECORDS), payload: coursesQuery })
export type Query = z.infer<typeof querySchema>
