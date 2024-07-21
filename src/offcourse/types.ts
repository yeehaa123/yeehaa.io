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
}

export enum OverlayModes {
  NONE = "NONE",
  INFO = "INFO",
  CHECKPOINT = "CHECKPOINT"
}

export type CardState = {
  userName: string | undefined,
  isBookmarked: boolean,
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
