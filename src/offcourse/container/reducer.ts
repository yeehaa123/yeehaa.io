import type { CourseCardState } from "../components/CourseCard";
import type { CourseQuery, CheckpointQuery } from "../types";

export enum ActionType {
  TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK",
  SHOW_CHECKPOINT = "SHOW_CHECKPOINT"
}

type Action =
  | { type: ActionType.TOGGLE_BOOKMARK, payload: CourseQuery }
  | { type: ActionType.SHOW_CHECKPOINT, payload: CheckpointQuery }

export function reducer(cards: CourseCardState[], { type, payload }: Action) {
  console.log(type, payload);
  switch (type) {
    case ActionType.TOGGLE_BOOKMARK: {
      const index = cards.findIndex((({ courseId }) =>
        courseId === payload.courseId
      ));
      if (index !== -1) {
        const { isBookmarked } = cards[index]!.userData
        cards[index]!.userData.isBookmarked = !isBookmarked
      }
      break;
    }
    case ActionType.SHOW_CHECKPOINT: {
      break;
    }
  }
}
