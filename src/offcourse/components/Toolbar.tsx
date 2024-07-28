import { cn } from "@/lib/utils"
import type { Course } from "../types"
import type { Affordances } from "../container/cardState"
import { Logo } from "./Logo";
import {
  Crosshair1Icon,
  Pencil2Icon,
} from '@radix-ui/react-icons'
import type { CardActions } from "./CourseCard";

type Props = {
  course: Course,
  actions: CardActions,
  affordances: Affordances
}

export default function Toolbar({
  course,
  affordances,
  actions,
}: Props) {
  const { habitat, courseId } = course;
  const {
    showInfoOverlay,
    showNotesOverlay,
  } = actions;
  const { canAnnotate } = affordances;
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-start gap-x-4 ">
        <Logo onClick={() => showInfoOverlay({ courseId })}
          className={
            cn("h-4 w-4 fill-gray-500 hover:fill-secondary", { "hidden": false })
          } />
      </div>
      <div className="flex gap-x-4 ">
        <Pencil2Icon onClick={() => showNotesOverlay({ courseId })}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canAnnotate })} />
      </div>
      <div className="flex gap-x-4 ">
        {habitat && <a href={`/posts/${habitat.slug}`} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500 hover:text-secondary" />
        </a>}
      </div>
    </div>
  )
}
