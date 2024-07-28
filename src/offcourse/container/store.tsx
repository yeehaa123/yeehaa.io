import type { AuthState } from "../types";
import type { CourseCardState } from "@/offcourse/components/CourseCard"
import type { Course, CourseQuery, CheckpointQuery } from "../types";
import { ActionType } from "./action"
import { reducer } from "./reducer"
import { initialize } from "./cardState"
import { useImmerReducer } from 'use-immer';
import { query, command, findCard } from "./helpers";
import { QueryType } from "../query";
import { responder } from "./responder";
import { authenticate, getAuthData, logout } from "./auth";
import { useEffect } from "react";
import type { Note } from "../schema";

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
        : dispatch({
          type: ActionType.ADD_BOOKMARK,
          payload: {
            ...payload,
            course: card.course
          }
        })
    }
  }

  const toggleCheckpoint = (payload: CheckpointQuery) => {
    const card = findCard(state, payload);
    const checkpointId = payload.checkpointId
    if (card) {
      const isCompleted = card.cardState.completed.find(id => id === checkpointId)
      isCompleted
        ? dispatch({ type: ActionType.UNCOMPLETE_CHECKPOINT, payload })
        : dispatch({
          type: ActionType.COMPLETE_CHECKPOINT,
          payload: {
            ...payload,
            course: card.course
          }
        })
    }

    console.log(card?.cardState, payload);
  }

  const showCheckpointOverlay = (payload: CheckpointQuery) =>
    dispatch({ type: ActionType.SHOW_CHECKPOINT_OVERLAY, payload })

  const showInfoOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_INFO_OVERLAY, payload })

  const showNotesOverlay = (payload: CourseQuery) =>
    dispatch({ type: ActionType.SHOW_NOTES_OVERLAY, payload })

  const hideCheckpointOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
    dispatch({ type: ActionType.UNSELECT_CHECKPOINT, payload })
  }

  const hideOverlay = async (payload: CourseQuery) => {
    dispatch({ type: ActionType.HIDE_OVERLAY, payload })
  }

  const addNote = (payload: CourseQuery & Note) => {
    dispatch({ type: ActionType.ADD_NOTE, payload })
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
    addNote,
    toggleBookmark,
    toggleCheckpoint,
    signIn,
    signOut,
    hideOverlay,
    showInfoOverlay,
    showNotesOverlay,
    showCheckpointOverlay,
    hideCheckpointOverlay
  }

  return { state, actions }
}
