import type { Course, Checkpoint } from "../../cms/convert"

export type Affordances = {
  canAuthenticate: boolean,
  canBookmark: boolean,
  canTakeNotes: boolean
  canCheckComplete: boolean,
  canClone: boolean,
  canEdit: boolean
}

export type CourseCardStore = {
  course: Course,
}

export type Curator = {
  alias: string;
  socials: { linkedin?: string }
}


export type { Course, Checkpoint }
