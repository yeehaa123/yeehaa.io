import type {
  AuthState,
  Course,
  CourseQuery,
  CheckpointQuery,
  Curator,
  Checkpoint,
  Habitat
} from "./schema"

export type Affordances = {
  canBookmark: boolean,
  canFollow: boolean,
}

export enum OverlayModes {
  NONE = "NONE",
  INFO = "INFO",
  CHECKPOINT = "CHECKPOINT"
}

export type CardState = {
  userName: string | undefined,
  isBookmarked: boolean,
  isFollowed: boolean,
  completed: string[],
  overlayMode: OverlayModes,
  selectedCheckpoint: Checkpoint | undefined,
  affordances: Affordances,
}

export type {
  AuthState,
  Course,
  Checkpoint,
  CourseQuery,
  CheckpointQuery,
  Habitat,
  Curator
}
