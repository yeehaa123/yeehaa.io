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

export enum OverlayModes {
  NONE = "NONE",
  CHECKPOINT = "CHECKPOINT"
}

export type CardState = {
  isBookmarked: boolean,
  overlayMode: OverlayModes,
  selectedCheckpoint: Checkpoint | undefined,
  affordances: Affordances,
}

export type Curator = {
  alias: string;
  socials: { linkedin?: string }
}

export type Checkpoint = {
  checkpointId: string,
  task: string,
  href: string,
  description: string,
  tags: string[]
}

export type Habitat = {
  slug: string
}

export type Course = {
  courseId: string
  goal: string,
  curator: Curator,
  description: string,
  tags: string[]
  checkpoints: Checkpoint[]
  habitat?: Habitat | undefined
}


