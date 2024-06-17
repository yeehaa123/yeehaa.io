import type { Course, Checkpoint } from "../../cms/convert"

export type CourseQuery = {
  courseId: string
}

export type CheckpointQuery = {
  courseId: string,
  checkpointId: string,
}

export type Affordances = {
  canBookmark: boolean,
}

export type UserCourseData = {
  isBookmarked: boolean
}

export type Curator = {
  alias: string;
  socials: { linkedin?: string }
}

export type OffcourseCardState = {
  course: Course,
  affordances: Affordances,
  userData: UserCourseData,
}[]


export type { Course, Checkpoint }
