import type { Course, AuthState, Checkpoint } from "@/offcourse/types";
import { OverlayModes } from "../components/Overlay"
import type { UserRecord, Note } from "../schema";
type OffCourseData = Course | Course[]

function isCourse(data: OffCourseData): data is Course {
  return !!(data as Course).courseId;
}

export type Affordances = {
  canAuthenticate: boolean,
  canBookmark: boolean,
  canFollow: boolean,
  canAnnotate: boolean,
}

export type CardState = {
  userName: string | undefined,
  isBookmarked: boolean,
  isFollowed: boolean,
  completed: string[],
  notes: Note[],
  overlayMode: OverlayModes,
  selectedCheckpoint: Checkpoint | undefined,
  affordances: Affordances,
}

const initialAffordances = {
  canAuthenticate: true,
  canBookmark: false,
  canFollow: false,
  canEdit: false,
  canAnnotate: false
}


export const initialCardState = {
  userName: undefined,
  isBookmarked: false,
  isFollowed: false,
  isCurated: false,
  completed: [],
  notes: [],
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
      canAnnotate: true
    }
  }
  return initialAffordances;
}

export function updateUserRecord(
  cardState: CardState,
  { isBookmarked, isFollowed, completed, notes }: UserRecord
) {
  return {
    ...cardState,
    isBookmarked,
    isFollowed,
    completed,
    notes,
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
