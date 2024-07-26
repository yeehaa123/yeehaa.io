import type { Checkpoint } from "@/offcourse/types";

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/offcourse/components"
import { cn } from "@/lib/utils";

interface Props extends Checkpoint {
  courseId: string,
  isCompleted: boolean
  canCheckComplete: boolean | undefined
  toggleComplete: () => void
  showCheckpoint: () => void
}

export default function Checkpoint({
  task,
  courseId,
  isCompleted,
  toggleComplete,
  showCheckpoint,
  canCheckComplete
}: Props) {
  const taskId = `${courseId}-${task}`
  return (
    <li className="group flex align-middle bg-gray-100 dark:bg-gray-900 dark:text-white
    hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-black p-3 flex items-center">
      {canCheckComplete &&
        <Checkbox
          checked={!!isCompleted}
          disabled={!canCheckComplete}
          id={`${courseId}-${task}`}
          onClick={toggleComplete} />}
      <Label
        htmlFor={taskId}
        className={cn("px-2 py-1", { "px-4": canCheckComplete })}>
        <button onClick={showCheckpoint}>{task}</button>
      </Label>
    </li>
  )
}
