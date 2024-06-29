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

  const showInfoOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_INFO_OVERLAY, payload })

  const hideCheckpointOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
    await timeout(1000);
    dispatch({ type: ActionType.UNSELECT_CHECKPOINT, payload })
  }
  const hideOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
  }


  const actions = {
    toggleBookmark,
    hideOverlay,
    showInfoOverlay,
    showCheckpointOverlay,
    hideCheckpointOverlay
  }
  return { state, actions }
}
