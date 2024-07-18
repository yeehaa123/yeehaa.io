import type { OffcourseState } from "./reducer";
import type { CourseCardState } from "../components/CourseCard";
import type { AuthState, CheckpointQuery, CourseQuery, } from "../types";

export function findCard(state: OffcourseState, payload: CourseQuery) {
  return state.cards.find((({ courseId }) =>
    courseId === payload.courseId
  ));
}

export function getCheckpoint(card: CourseCardState, payload: CheckpointQuery) {
  return card.course.checkpoints.find(cp => cp.checkpointId === payload.checkpointId);
}

export async function fetchUserData(authData: AuthState, courseIds: string[]) {
  const response = await fetch(`${authData.repository}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseIds)
  });
  console.log(response);
  return [];
}
