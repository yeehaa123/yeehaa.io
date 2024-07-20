import type { OffcourseState } from "./reducer";
import type { Action } from "./action";
import type { CourseCardState } from "../components/CourseCard";
import type { AuthState, CourseQuery, CheckpointQuery } from "../types";
import queryString from 'query-string';


export function findCard(state: OffcourseState, payload: CourseQuery) {
  return state.cards.find((({ courseId }) =>
    courseId === payload.courseId
  ));
}

export function getCheckpoint(card: CourseCardState, payload: CheckpointQuery) {
  return card.course.checkpoints.find(cp => cp.checkpointId === payload.checkpointId);
}

// export async function fetchUserData(authData: AuthState, courseIds: string[]) {
//   const { repository } = authData;
//   const response = await fetch(`${repository}.json`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ courseIds })
//   });
//   return await response.json();
// }
//
// export async function addBookmark(authData: AuthState, courseQuery: CourseQuery) {
//   const { repository } = authData;
//   const { courseId } = courseQuery;
//   const url = `${repository}/bookmarks/${courseId}.json`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     }
//   });
//   return await response.json();
// }
//
// export async function removeBookmark(authData: AuthState, courseQuery: CourseQuery) {
//   const { repository } = authData;
//   const { courseId } = courseQuery;
//   const url = `${repository}/bookmarks/${courseId}.json`;
//   const response = await fetch(url, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     }
//   });
//   return await response.json();
// }
//
//
export async function Read(authData: AuthState, query: { courseIds: string[] }) {
  const { repository } = authData;
  const url = queryString.stringifyUrl({ url: `${repository}.json`, query });
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function Command(authData: AuthState, action: Action) {
  const { repository } = authData;
  const url = `${repository}.json`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action })
  });
  return await response.json();
}
