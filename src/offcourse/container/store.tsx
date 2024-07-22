import type { AuthState } from "../types";
import type { CourseCardState } from "@/offcourse/components/CourseCard"
import type { Course, CourseQuery, CheckpointQuery } from "../types";
import { ActionType } from "./action"
import { reducer } from "./reducer"
import { initialize } from "./initialize"
import { useImmerReducer } from 'use-immer';
import { query, command, findCard } from "./helpers";
import { QueryType } from "../query";
import { responder } from "./responder";
import { authenticate, getAuthData, logout } from "./auth";
import { useEffect } from "react";

export type StoreCardState = Omit<CourseCardState, "actions">
export type OffcourseState = {
  cards: StoreCardState[],
  auth: AuthState | undefined
}

export function useOffcourse(data: Course | Course[]) {
  const [state, _dispatch] = useImmerReducer(reducer, data, initialize);
  const dispatch = command(state, _dispatch);
  const respond = responder(dispatch);

  useEffect(() => {
    const authData = getAuthData()
    if (authData) {
      _authenticate(authData);
    }
  }, [])


  const toggleBookmark = (payload: CourseQuery) => {
    const card = findCard(state, payload);
    if (card) {
      card.cardState.isBookmarked
        ? dispatch({ type: ActionType.REMOVE_BOOKMARK, payload })
        : dispatch({ type: ActionType.ADD_BOOKMARK, payload: card.course })
    }
  }

  const showCheckpointOverlay = (payload: CheckpointQuery) =>
    dispatch({ type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload })

  const showInfoOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_INFO_OVERLAY, payload })

  const hideCheckpointOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
    dispatch({ type: ActionType.UNSELECT_CHECKPOINT, payload })
  }
  const hideOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
  }

  const signIn = async () => {
    const authData = { userName: "Yeehaa", repository: "/offcourse" };
    _authenticate(authData);
  }

  const _authenticate = async (authData: AuthState) => {
    const authResponse = await authenticate(authData);
    respond(authResponse);
    const payload = { courseIds: state.cards.map(({ courseId }) => courseId) }
    const response = await query({ type: QueryType.FETCH_USER_RECORDS, payload });
    respond(response);
  }

  const signOut = async () => {
    const response = await logout();
    respond(response);
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
