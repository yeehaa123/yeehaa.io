import type { Course, CourseQuery, CheckpointQuery, UserCourseData, Affordances } from "@/offcourse/types";
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

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

export type CourseCardState = {
  courseId: string,
  course: Course,
  userData: UserCourseData,
  affordances: Affordances,
}

export type Actions = {
  toggleBookmark: (query: CourseQuery) => void,
  showCheckpoint: (query: CheckpointQuery) => void
}

type Props = CourseCardState & {
  actions: Actions
}

export default function CourseCard({ course, userData, affordances, actions }: Props) {
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
    showCheckpoint
  } = actions

  const {
    isBookmarked
  } = userData

  const {
    canBookmark
  } = affordances

  return (
    <Card className={cn("flex flex-col select-none")}>
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-between space-x-5 ">
          <span className="max-w-[80%]">{goal}</span>
          <Bookmark
            canBookmark={canBookmark}
            isBookmarked={isBookmarked}
            onClick={() => toggleBookmark({ courseId })} />
        </CardTitle>
        <Curator alias={curator} socials={{}} />
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
              showCheckpoint={() => showCheckpoint({ courseId, checkpointId })}
              key={index}
              checkpointId={checkpointId}
              {...cp} />)))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4">
        <Toolbar habitat={habitat} />
      </CardFooter>
    </Card >
  )
}
