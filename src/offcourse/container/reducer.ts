import type { CourseCardState } from "../components/CourseCard";
import type { CourseQuery, CheckpointQuery } from "../types";
import { OverlayModes } from "../types";

export enum ActionType {
  TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK",
  SHOW_CHECKPOINT_OVERLAY = "SHOW_CHECKPOINT_OVERLAY",
  HIDE_CHECKPOINT_OVERLAY = "HIDE_CHECKPOINT_OVERLAY"
}

type Action =
  | { type: ActionType.TOGGLE_BOOKMARK, payload: CourseQuery }
  | { type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload: CheckpointQuery }
  | { type: ActionType.HIDE_CHECKPOINT_OVERLAY, payload: CourseQuery }

export function reducer(cards: CourseCardState[], { type, payload }: Action) {
  console.log(type, payload);
  switch (type) {
    case ActionType.TOGGLE_BOOKMARK: {
      const index = cards.findIndex((({ courseId }) =>
        courseId === payload.courseId
      ));
      if (index !== -1) {
        const { isBookmarked } = cards[index]!.cardState
        cards[index]!.cardState.isBookmarked = !isBookmarked
      }
      break;
    }
    case ActionType.SHOW_CHECKPOINT_OVERLAY: {
      const index = cards.findIndex((({ courseId }) =>
        courseId === payload.courseId
      ));
      if (index !== -1) {
        const checkpoint = cards[index]!
          .course.checkpoints.find(cp => cp.checkpointId === payload.checkpointId);
        if (checkpoint) {
          cards[index]!.cardState.overlayMode = OverlayModes.CHECKPOINT;
          cards[index]!.cardState.selectedCheckpoint = checkpoint;
        }
      }
      break;
    }
    case ActionType.HIDE_CHECKPOINT_OVERLAY: {
      const index = cards.findIndex((({ courseId }) =>
        courseId === payload.courseId
      ));
      if (index !== -1) {
        cards[index]!.cardState.overlayMode = OverlayModes.NONE;
        cards[index]!.cardState.selectedCheckpoint = undefined;
      }
      break;
    }
  }
}
