import type { Course } from "../types";
import { CourseCollection } from "../components"
import { useOffcourse } from "./store";

type Props = {
  data: Course | Course[]
}

export function Offcourse({ data }: Props) {
  const { state, actions } = useOffcourse(data);
  return <CourseCollection cards={state} actions={actions} />
}
