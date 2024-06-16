import type { CourseCardStore } from "@/offcourse/types";
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

export default function CourseCard({ course }: CourseCardStore) {
  const {
    courseId,
    goal,
    curator,
    checkpoints,
    description,
    tags,
    habitat
  } = course;

  return (
    <Card className={cn("flex flex-col select-none")}>
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-between space-x-5 ">
          <span className="max-w-[80%]">{goal}</span>
          <Bookmark onClick={console.log} />
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
