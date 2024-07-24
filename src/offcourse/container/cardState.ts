import { OverlayModes, type Course, type AuthState, type CardState } from "@/offcourse/types";
import type { UserRecord } from "../schema";
type OffCourseData = Course | Course[]

function isCourse(data: OffCourseData): data is Course {
  return !!(data as Course).courseId;
}

const initialAffordances = {
  canBookmark: false,
  canFollow: false,
  canEdit: false
}

export const initialCardState = {
  userName: undefined,
  isBookmarked: false,
  isFollowed: false,
  isCurated: false,
  selectedCheckpoint: undefined,
  overlayMode: OverlayModes.NONE,
  affordances: initialAffordances
}

export function updateAffordances(auth: AuthState) {
  if (auth) {
    return {
      ...initialAffordances,
      canBookmark: true,
      canFollow: true,
    }
  }
  return initialAffordances;
}

export function updateUserRecord(
  cardState: CardState,
  { isBookmarked, isFollowed }: UserRecord
) {
  return {
    ...cardState,
    isBookmarked,
    isFollowed
  }
}

export function initialize(data: OffCourseData) {
  const courses = isCourse(data) ? [data] : [...data];
  const cards = courses.map(course => {
    return {
      courseId: course.courseId,
      course,
      cardState: initialCardState
    }
  })
  return { cards, auth: undefined };
}
