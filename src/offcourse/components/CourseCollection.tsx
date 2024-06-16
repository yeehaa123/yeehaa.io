import { CourseCard } from "."
import type { Course } from "@/offcourse/types";

type CollectionProps = {
  courses: Course[]
}

export default function CourseCollection({ courses }: CollectionProps) {
  return (
    <div
      className="grid justify-center items-start gap-4 gap-y-8 m-2 
      grid-cols-[repeat(auto-fit,minmax(360px,400px))]">
      {courses.map((course) => {
        const { courseId } = course;
        return <CourseCard key={courseId} course={course} />
      })}
    </div>)
}

