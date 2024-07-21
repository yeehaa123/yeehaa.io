import { z } from "zod";
import { authState, userRecord } from "./schema";

export enum RESPONSE_TYPE {
  AUTHENTICATED = "AUTHENTICATED",
  lOGGED_OUT = "LOGGED_OUT",
  FETCHED_USER_RECORDS = "FETCHED_USER_RECORDS",
  NO_OP = "NO_OP"
}

export const responseSchema = z.union([
  z.object({ type: z.literal(RESPONSE_TYPE.AUTHENTICATED), payload: authState }),
  z.object({ type: z.literal(RESPONSE_TYPE.lOGGED_OUT), payload: z.undefined() }),
  z.object({ type: z.literal(RESPONSE_TYPE.FETCHED_USER_RECORDS), payload: z.array(userRecord) }),
  z.object({ type: z.literal(RESPONSE_TYPE.NO_OP), payload: z.undefined() }),
])

export type Response = z.infer<typeof responseSchema>
