import type { Course } from "@/offcourse/types";
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
export type Actions = {
  toggleBookmark: (courseId: string) => void
}

export type CourseCard = {
  courseId: string,
  course: Course,
  userData: {
    isBookmarked: boolean
  }
  affordances: {
    canBookmark: boolean
  }
  actions: Actions
}

export default function CourseCard({ course, userData, affordances, actions }: CourseCard) {
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
    toggleBookmark
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
            onClick={() => toggleBookmark(courseId)} />
        </CardTitle>
        <Curator alias={curator} socials={{}} />
        <CardDescription onClick={console.log}>
          {description}
        </CardDescription>
        <Tags tags={tags} />
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {checkpoints.map((cp, index) => (
            <Checkpoint
              courseId={courseId}
              toggleComplete={console.log}
              showCheckpoint={console.log}
              key={index}
              {...cp} />))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4">
        <Toolbar habitat={habitat} />
      </CardFooter>
    </Card >
  )
}
