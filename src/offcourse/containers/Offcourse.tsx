import { CourseCollection } from "@/offcourse/components"
import type { Course } from "@/offcourse/types";
import { useOffcourse } from "./state";

type Props = {
  data: Course | Course[]
}

export function Offcourse({ data }: Props) {
  const { state, actions } = useOffcourse({ data });
  return <CourseCollection cards={state} actions={actions} />
}

