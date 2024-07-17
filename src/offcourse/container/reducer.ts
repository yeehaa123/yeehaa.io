import type { CourseCardState } from "../components/CourseCard";
import type { CourseQuery, CheckpointQuery, AuthState } from "../types";
import { OverlayModes } from "../types";
import { findCard, getCheckpoint } from "./helpers";

export enum ActionType {
  AUTHENTICATE = "AUTHENTICATE",
  TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK",
  SHOW_CHECKPOINT_OVERLAY = "SHOW_CHECKPOINT_OVERLAY",
  SHOW_INFO_OVERLAY = "SHOW_INFO_OVERLAY",
  HIDE_OVERLAY = "HIDE_OVERLAY",
  UNSELECT_CHECKPOINT = "UNSELECT_CHECKPOINT"
}

export type OffcourseState = {
  cards: CourseCardState[],
  auth: AuthState | undefined
}

type Action =
  | { type: ActionType.TOGGLE_BOOKMARK, payload: CourseQuery }
  | { type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload: CheckpointQuery }
  | { type: ActionType.SHOW_INFO_OVERLAY, payload: CourseQuery }
  | { type: ActionType.HIDE_OVERLAY, payload: CourseQuery }
  | { type: ActionType.UNSELECT_CHECKPOINT, payload: CourseQuery }
  | { type: ActionType.AUTHENTICATE, payload: { authData: AuthState, userData: string[] } }

export function reducer(state: OffcourseState, { type, payload }: Action) {
  console.log(type, payload);
  switch (type) {
    case ActionType.TOGGLE_BOOKMARK: {
      const card = findCard(state, payload);
      if (card) {
        const { isBookmarked } = card.cardState
        card.cardState.isBookmarked = !isBookmarked
      }
      break;
    }
    case ActionType.SHOW_CHECKPOINT_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        const checkpoint = getCheckpoint(card, payload);
        if (checkpoint) {
          card.cardState.overlayMode = OverlayModes.CHECKPOINT;
          card.cardState.selectedCheckpoint = checkpoint;
        }
      }
      break;
    }
    case ActionType.SHOW_INFO_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.overlayMode = OverlayModes.INFO;
      }
      break;
    }
    case ActionType.HIDE_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.overlayMode = OverlayModes.NONE;
      }
      break;
    }
    case ActionType.UNSELECT_CHECKPOINT: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.selectedCheckpoint = undefined
      }
      break;
    }
    case ActionType.AUTHENTICATE: {
      state.auth = payload.authData;
      console.log(payload.userData);
      state.cards.forEach(card => {
        card.cardState.overlayMode = OverlayModes.NONE;
        card.cardState.affordances.canBookmark = true;
      })
      break;
    }
  }
}
