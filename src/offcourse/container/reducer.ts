import type { CourseCardState } from "../components/CourseCard";
import type { Action } from "./action";
import { ActionType } from "./action";
import type { AuthState } from "../types";
import { OverlayModes } from "../types";
import { findCard, getCheckpoint } from "./helpers";
import { initialCardState } from "./initialize";

export type OffcourseState = {
  cards: CourseCardState[],
  auth: AuthState | undefined
}

export function reducer(state: OffcourseState, action: Action) {
  const { type, payload } = action;
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
      state.auth = payload
      state.cards.forEach(card => {
        card.cardState.userName = payload.userName;
        card.cardState.overlayMode = OverlayModes.NONE;
        card.cardState.affordances.canBookmark = true;
      })
      break;
    }
    case ActionType.LOG_OUT: {
      state.auth = undefined
      state.cards.forEach(card => {
        card.cardState = initialCardState;
      })
      break;
    }
    case ActionType.ADD_USER_DATA: {
      payload.map((record) => {
        const card = findCard(state, record);
        if (card) {
          card.cardState.isBookmarked = record.isBookmarked;
        }
      })
      break;
    }
  }
}
