import type { CourseCardState } from "../components/CourseCard";
import type { CheckpointQuery, CourseQuery, } from "../types";

export function findCard(cards: CourseCardState[], payload: CourseQuery) {
  return cards.find((({ courseId }) =>
    courseId === payload.courseId
  ));
}

export function getCheckpoint(card: CourseCardState, payload: CheckpointQuery) {
  return card.course.checkpoints.find(cp => cp.checkpointId === payload.checkpointId);
}
