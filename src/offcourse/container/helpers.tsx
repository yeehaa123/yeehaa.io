import type { OffcourseState, StoreCardState } from "./store";
import type { Dispatch } from "react";
import { ActionType, type Action, actionSchema } from "./action";
import type { CourseQuery, CheckpointQuery } from "../types";
import type { Query } from "../query";
import { getAuthData } from "./auth";


export function findCard(state: OffcourseState, payload: CourseQuery) {
  return state.cards.find((({ courseId }) =>
    courseId === payload.courseId
  ));
}

export function getCheckpoint(card: StoreCardState, payload: CheckpointQuery) {
  return card.course.checkpoints.find(cp => cp.checkpointId === payload.checkpointId);
}

export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function command({ auth }: OffcourseState, dispatch: Dispatch<Action>) {
  return (action: Action) => {
    const parsedAction = actionSchema.parse(action);
    if (auth && parsedAction.type !== ActionType.LOG_OUT) {
      sendCommand(parsedAction);
    }
    return dispatch(parsedAction);
  }
}

export async function sendCommand(action: Action) {
  const authData = getAuthData();
  if (!authData) {
    throw (`${action.type} UNAUTHORIZED USE`)
  }
  const { repository } = authData;
  const url = `${repository}/command.json`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action)
  });
  return await response.json();
}

export async function query(query: Query) {
  const authData = getAuthData();
  if (!authData) {
    throw ("UNAUTHORIZED USE")
  }
  const { repository } = authData;
  const url = `${repository}/query.json`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query)
  });
  return await response.json();
}

