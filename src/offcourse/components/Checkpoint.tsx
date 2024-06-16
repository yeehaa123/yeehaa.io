import type { Checkpoint } from "@/offcourse/types";

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/offcourse/components"

interface Props extends Checkpoint {
  courseId: string,
  isCompleted?: boolean | undefined
  canCheckComplete?: boolean | undefined
  toggleComplete: () => void
  showCheckpoint: () => void
}

export default function Checkpoint({
  task,
  courseId,
  isCompleted,
  toggleComplete,
  showCheckpoint,
  canCheckComplete }: Props) {
  const taskId = `${courseId}-${task}`
  return (
    <li className="group flex align-middle bg-gray-100 
    hover:bg-gray-900 hover:text-white p-3 flex items-center space-x-2">
      <Checkbox
        checked={!!isCompleted}
        disabled={!canCheckComplete}
        id={`${courseId}-${task}`}
        onClick={toggleComplete} />
      <Label htmlFor={taskId}>
        <button onClick={showCheckpoint}>{task}</button>
      </Label>
    </li>
  )
}
