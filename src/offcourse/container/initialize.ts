import type { Course } from "@/offcourse/types";
type OffCourseData = Course | Course[]

function isCourse(data: OffCourseData): data is Course {
  return !!(data as Course).courseId;
}
export function initialize(data: OffCourseData) {
  const courses = isCourse(data) ? [data] : [...data];
  return courses.map(course => {
    return {
      courseId: course.courseId,
      course,
      userData: {
        isBookmarked: false
      },
      affordances: {
        canBookmark: true
      }
    }
  })
}
