import type {
  Course,
  CourseQuery,
  CheckpointQuery,
  AuthState
} from "@/offcourse/types";
import type { CardState } from "../container/cardState"
import { Overlay } from "./Overlay"
import CardChrome from "./CardChrome";

import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

import {
  Toolbar,
  Curator,
  Bookmark,
  Checkpoint,
  Tags
} from "./";
import type { Note } from "../schema";

export type CardActions = {
  signIn: () => void,
  signOut: () => void,
  toggleBookmark: (arg: CourseQuery) => void,
  toggleCheckpoint: (arg: CheckpointQuery) => void,
  showCheckpointOverlay: (arg: CheckpointQuery) => void
  showInfoOverlay: (arg: CourseQuery) => void
  showNotesOverlay: (arg: CourseQuery) => void
  hideOverlay: (arg: CourseQuery) => void
  addNote: (arg: Note & CourseQuery) => void;
}

export type CourseCardState = {
  courseId: string,
  course: Course,
  cardState: CardState,
  authData?: AuthState,
  actions: CardActions
}

export default function CourseCard(courseCardState: CourseCardState) {
  const { course, actions, cardState } = courseCardState;
  const {
    courseId,
    goal,
    curator,
    checkpoints,
    description,
    tags,
  } = course;

  const {
    toggleBookmark,
    toggleCheckpoint,
    showCheckpointOverlay
  } = actions

  const {
    isBookmarked,
    affordances,
    completed
  } = cardState


  const {
    canBookmark,
    canFollow
  } = affordances

  return (
    <div className="grid *:col-start-1 *:row-start-1 overflow-hidden" >
      <Overlay {...courseCardState} />
      < CardChrome>
        <CardHeader className="space-y-4">
          <CardTitle className="flex w-full justify-between space-x-5 ">
            <span className="max-w-[80%]">{goal}</span>
            <Bookmark
              canBookmark={canBookmark}
              isBookmarked={isBookmarked}
              onClick={() => toggleBookmark({ courseId })} />
          </CardTitle>
          <Curator {...curator} />
          <CardDescription onClick={console.log}>
            {description}
          </CardDescription>
          <Tags tags={tags} />
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2">
            {checkpoints.map((({ checkpointId, ...cp }, index) => (
              <Checkpoint
                key={index}
                isCompleted={!!completed.find(id => id === checkpointId)}
                courseId={courseId}
                canCheckComplete={canFollow}
                toggleComplete={() => toggleCheckpoint({ checkpointId, courseId })}
                showCheckpoint={() => showCheckpointOverlay({ courseId, checkpointId })}
                checkpointId={checkpointId}
                {...cp} />)))
            }
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-4">
          <Toolbar
            course={course}
            affordances={affordances}
            actions={actions} />
        </CardFooter>
      </CardChrome >
    </div >)
}
