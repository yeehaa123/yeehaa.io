
export const toggleBookmark = (dispatch: (action:
  { type: string, courseId: string }) => void) => (courseId: string) => {
    dispatch({ type: 'toggleBookmark', courseId })

  }
