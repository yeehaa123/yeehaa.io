import type { CourseCardState, Actions } from "./CourseCard"
import { CourseCard } from "."

export type Props = {
  cards: CourseCardState[],
  actions: Actions
}

export default function CourseCollection({ cards, actions }: Props) {
  return (
    <div
      className="grid justify-center items-start gap-4 gap-y-8 m-2 
      grid-cols-[repeat(auto-fit,minmax(360px,400px))]">
      {cards.map(card => (
        <CourseCard {...card} key={card.course.courseId} actions={actions} />)
      )}
    </div>)
}
