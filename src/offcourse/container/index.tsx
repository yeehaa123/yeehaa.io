import type { Course } from "../types";
import { CourseCollection } from "../components"
import { useOffcourse } from "./store";

export type ContainerProps = {
  data: Course | Course[]
}

export function Offcourse({ data }: ContainerProps) {
  const { state, actions } = useOffcourse(data);
  return <CourseCollection cards={state.cards} actions={actions} />
}
