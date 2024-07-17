import type {
  Course,
  CourseQuery,
  CheckpointQuery,
  CardState,
  AuthState
} from "@/offcourse/types";
import { Overlay } from "./Overlay";
import CardChrome from "./CardChrome";

import {
  CardDescription, CardHeader, CardTitle,
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

export type CourseCardState = {
  courseId: string,
  course: Course,
  cardState: CardState,
  authData?: AuthState,
}

export type Actions = {
  signIn: () => void,
  toggleBookmark: (query: CourseQuery) => void,
  showCheckpointOverlay: (query: CheckpointQuery) => void
  showInfoOverlay: (query: CourseQuery) => void
  hideCheckpointOverlay: (query: CourseQuery) => void
}

type Props = CourseCardState & {
  actions: Actions
}

export default function CourseCard({ course, cardState, actions }: Props) {
  const {
    courseId,
    goal,
    curator,
    checkpoints,
    description,
    tags,
    habitat
  } = course;

  const {
    toggleBookmark,
    showInfoOverlay,
    showCheckpointOverlay
  } = actions

  const {
    isBookmarked,
    affordances
  } = cardState

  const {
    canBookmark
  } = affordances

  return (
    <div className="grid *:col-start-1 *:row-start-1 overflow-hidden" >
      <Overlay courseId={courseId} cardState={cardState} actions={actions} />
      <CardChrome>
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
                courseId={courseId}
                toggleComplete={console.log}
                showCheckpoint={() => showCheckpointOverlay({ courseId, checkpointId })}
                key={index}
                checkpointId={checkpointId}
                {...cp} />)))
            }
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-4">
          <Toolbar showInfoOverlay={() => showInfoOverlay({ courseId })} habitat={habitat} />
        </CardFooter>
      </CardChrome >
    </div >)
}
