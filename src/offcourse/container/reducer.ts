import type { Action } from "./action";
import type { OffcourseState } from "@/offcourse/container/store";
import { ActionType } from "./action";
import { OverlayModes } from "@/offcourse/types";
import { findCard, getCheckpoint } from "./helpers";
import { initialCardState } from "./initialize";

export function reducer(state: OffcourseState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.ADD_BOOKMARK: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.isBookmarked = true
      }
      break;
    }
    case ActionType.REMOVE_BOOKMARK: {
      const card = findCard(state, payload);
      if (card) {
        card.cardState.isBookmarked = false
      }
      break;
    }
    case ActionType.SHOW_CHECKPOINT_OVERLAY: {
      const card = findCard(state, payload);
      if (card) {
        const checkpoint = getCheckpoint(card, payload); if (checkpoint) {
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
    case ActionType.ADD_AUTH_DATA: {
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
