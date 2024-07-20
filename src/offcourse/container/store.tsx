import type { Course, CourseQuery, CheckpointQuery } from "../types";
import type { OffcourseState } from "./reducer"
import type { Action } from "./action"
import { ActionType } from "./action"
import { reducer } from "./reducer"
import { initialize } from "./initialize"
import { useImmerReducer } from 'use-immer';
import { Command, Read } from "./helpers";
import type { Dispatch } from "react";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function CommandDispatch({ auth }: OffcourseState, dispatch: Dispatch<Action>) {
  return (action: Action) => {
    if (auth) {
      Command(auth, action);
    }
    return dispatch(action);
  }
}

export function useOffcourse(data: Course | Course[]) {
  const [state, _dispatch] = useImmerReducer(reducer, data, initialize);
  const dispatch = CommandDispatch(state, _dispatch);


  const toggleBookmark = (payload: CourseQuery) => {
    dispatch({ type: ActionType.TOGGLE_BOOKMARK, payload })
  }

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
    dispatch({ type: ActionType.AUTHENTICATE, payload: authData })
    const query = { courseIds: state.cards.map(({ course }) => course.courseId) }
    const userData = await Read(authData, query);
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
