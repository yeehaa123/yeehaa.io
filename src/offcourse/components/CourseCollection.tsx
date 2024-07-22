import type { CourseCardState, Actions } from "./CourseCard"
import { CourseCard } from "."

export type Props = {
  cards: CourseCardState[],
  actions: Actions
}

export default function CourseCollection({ cards, actions }: Props) {
  return (
    <div
      className="grid justify-center items-start gap-8 
      grid-cols-[repeat(auto-fit,minmax(360px,360px))]">
      {cards.map(card => (
        <CourseCard {...card} key={card.course.courseId} actions={actions} />)
      )}
    </div>)
}
