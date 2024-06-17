
import { CourseCollection } from "@/offcourse/components"
import type { Course } from "@/offcourse/types";
import type { CourseCard } from "@/offcourse/components/CourseCard";
import { useReducer } from 'react';

type CourseCollection = Course[]


export type OffcourseState = Omit<CourseCard, 'actions'>[]

type OffCourseData = Course | Course[]

type Props = {
  data: OffCourseData
}

function isCourse(data: OffCourseData): data is Course {
  return !!(data as Course).courseId;
}

function createCourseCardState(courses: CourseCollection) {
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

function reducer(cards: OffcourseState, action: { type: string, courseId: string }) {
  switch (action.type) {
    case 'toggleBookmark': {
      return cards.map(card => {
        if (card.courseId === action.courseId) {
          return {
            ...card,
            userData: {
              ...card.userData,
              isBookmarked: !card.userData.isBookmarked
            }
          }
        }
        return card;
      })

    }
    default: return cards;
  }
}

export function useOffcourse({ data }: Props) {
  const courses = isCourse(data) ? [data] : [...data];
  const [state, dispatch] = useReducer(reducer, courses, createCourseCardState);

  function toggleBookmark(courseId: string) {
    dispatch({ type: 'toggleBookmark', courseId })
  }

  const actions = { toggleBookmark }
  return { state, actions }
}
