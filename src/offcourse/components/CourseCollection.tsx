import { CourseCard } from "."
import type { OffcourseState } from "@/offcourse/containers/state";
import type { Actions } from "./CourseCard";


export type Props = {
  cards: OffcourseState
  actions: Actions
}

export default function CourseCollection({ cards, actions }: Props) {
  return (
    <div
      className="grid justify-center items-start gap-4 gap-y-8 m-2 
      grid-cols-[repeat(auto-fit,minmax(360px,400px))]">
      {cards.map(card => (
        <CourseCard {...card} key={card.courseId} actions={actions} />)
      )}
    </div>)
}
