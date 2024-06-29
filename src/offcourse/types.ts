import type {
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
  isBookmarked: boolean,
  overlayMode: OverlayModes,
  selectedCheckpoint: Checkpoint | undefined,
  affordances: Affordances,
}

export type {
  Course,
  Checkpoint,
  CourseQuery,
  CheckpointQuery,
  Habitat,
  Curator
}
