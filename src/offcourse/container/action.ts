import { z } from "zod";
import { authState, checkpointQuery, courseQuery, userRecord } from "../schema";

export enum ActionType {
  ADD_AUTH_DATA = "AUTHENTICATE",
  ADD_BOOKMARK = "ADD_BOOKMARK",
  REMOVE_BOOKMARK = "REMOVE_BOOKMARK",
  SHOW_CHECKPOINT_OVERLAY = "SHOW_CHECKPOINT_OVERLAY",
  SHOW_INFO_OVERLAY = "SHOW_INFO_OVERLAY",
  HIDE_OVERLAY = "HIDE_OVERLAY",
  UNSELECT_CHECKPOINT = "UNSELECT_CHECKPOINT",
  ADD_USER_DATA = "ADD_USER_DATA",
  LOG_OUT = "LOG_OUT",
}

export const actionSchema = z.union([
  z.object({ type: z.literal(ActionType.ADD_BOOKMARK), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.REMOVE_BOOKMARK), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.SHOW_CHECKPOINT_OVERLAY), payload: checkpointQuery }),
  z.object({ type: z.literal(ActionType.SHOW_INFO_OVERLAY), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.HIDE_OVERLAY), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.UNSELECT_CHECKPOINT), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.ADD_AUTH_DATA), payload: authState }),
  z.object({ type: z.literal(ActionType.LOG_OUT), payload: z.undefined() }),
  z.object({ type: z.literal(ActionType.ADD_USER_DATA), payload: z.array(userRecord) })
])

export type Action = z.infer<typeof actionSchema>
