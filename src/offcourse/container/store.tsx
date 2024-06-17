import type { Course, CourseQuery, CheckpointQuery } from "../types";
import { ActionType, reducer } from "./reducer"
import { initialize } from "./initialize"
import { useImmerReducer } from 'use-immer';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function useOffcourse(data: Course | Course[]) {
  const [state, dispatch] = useImmerReducer(reducer, data, initialize);

  const toggleBookmark = (payload: CourseQuery) =>
    dispatch({ type: ActionType.TOGGLE_BOOKMARK, payload })

  const showCheckpointOverlay = (payload: CheckpointQuery) =>
    dispatch({ type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload })

  const hideCheckpointOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
    await timeout(3000);
  }


  const actions = {
    toggleBookmark,
    showCheckpointOverlay,
    hideCheckpointOverlay
  }
  return { state, actions }
}
