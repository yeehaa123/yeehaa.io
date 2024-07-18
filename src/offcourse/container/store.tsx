import type { Course, CourseQuery, CheckpointQuery } from "../types";
import { ActionType, reducer } from "./reducer"
import { initialize } from "./initialize"
import { useImmerReducer } from 'use-immer';
import { fetchUserData } from "./helpers";

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

  const signIn = async () => {
    const authData = { userName: "Yeehaa", repository: "/offcourse" };
    const courseIds = state.cards.map(({ courseId }) => courseId);
    dispatch({ type: ActionType.AUTHENTICATE, payload: authData })
    const userData = await fetchUserData(authData, courseIds);
    dispatch({ type: ActionType.ADD_USER_DATA, payload: userData })
  }

  const signOut = async () => {
    dispatch({ type: ActionType.LOG_OUT, payload: undefined })
  }


  const actions = {
    toggleBookmark,
    signIn,
    signOut,
    hideOverlay,
    showInfoOverlay,
    showCheckpointOverlay,
    hideCheckpointOverlay
  }
  return { state, actions }
}
