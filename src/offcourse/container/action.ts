import type { CourseQuery, CheckpointQuery, AuthState } from "../types";

export enum ActionType {
  AUTHENTICATE = "AUTHENTICATE",
  TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK",
  SHOW_CHECKPOINT_OVERLAY = "SHOW_CHECKPOINT_OVERLAY",
  SHOW_INFO_OVERLAY = "SHOW_INFO_OVERLAY",
  HIDE_OVERLAY = "HIDE_OVERLAY",
  UNSELECT_CHECKPOINT = "UNSELECT_CHECKPOINT",
  ADD_USER_DATA = "ADD_USER_DATA",
  LOG_OUT = "LOG_OUT"
}

export type Action =
  | { type: ActionType.TOGGLE_BOOKMARK, payload: CourseQuery }
  | { type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload: CheckpointQuery }
  | { type: ActionType.SHOW_INFO_OVERLAY, payload: CourseQuery }
  | { type: ActionType.HIDE_OVERLAY, payload: CourseQuery }
  | { type: ActionType.UNSELECT_CHECKPOINT, payload: CourseQuery }
  | { type: ActionType.AUTHENTICATE, payload: AuthState }
  | { type: ActionType.LOG_OUT, payload: undefined }
  | { type: ActionType.ADD_USER_DATA, payload: { courseId: string, isBookmarked: boolean }[] }
