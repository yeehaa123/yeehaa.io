import { CourseCollection, CourseCard as CourseCardComponent } from "@/offcourse/components"
import type { Course } from "@/offcourse/types";

type Props = {
  course: Course
  standAlone: boolean
}
export function CourseCard({ course, standAlone }: Props) {
  if (standAlone) {
    return <CourseCollection courses={[course]} />
  }

  return <CourseCardComponent course={course} />
}
