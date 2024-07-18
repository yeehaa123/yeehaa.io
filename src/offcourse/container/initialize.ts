import { OverlayModes, type Course } from "@/offcourse/types";
type OffCourseData = Course | Course[]

function isCourse(data: OffCourseData): data is Course {
  return !!(data as Course).courseId;
}

export const initialCardState = {
  userName: undefined,
  isBookmarked: false,
  selectedCheckpoint: undefined,
  overlayMode: OverlayModes.NONE,
  affordances: {
    canBookmark: false
  }
}

export function initialize(data: OffCourseData) {
  const courses = isCourse(data) ? [data] : [...data];
  const cards = courses.map(course => {
    return {
      courseId: course.courseId,
      course,
      cardState: initialCardState
    }
  })
  return { cards, auth: undefined };
}
