import { OverlayModes, type Course } from "@/offcourse/types";
type OffCourseData = Course | Course[]

function isCourse(data: OffCourseData): data is Course {
  return !!(data as Course).courseId;
}
export function initialize(data: OffCourseData) {
  const courses = isCourse(data) ? [data] : [...data];
  const cards = courses.map(course => {
    return {
      courseId: course.courseId,
      course,
      cardState: {
        isBookmarked: false,
        selectedCheckpoint: undefined,
        overlayMode: OverlayModes.NONE,
        affordances: {
          canBookmark: false
        }
      },
    }
  })
  return { cards, auth: undefined };
}
