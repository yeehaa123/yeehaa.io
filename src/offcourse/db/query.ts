import { querySchema, QueryType } from '@/offcourse/query';
import { getBookmarks } from "@/offcourse/db/queries"
import { RESPONSE_TYPE } from '../response';

export async function handleQuery(body: string) {
  const query = querySchema.parse(body);
  const { type, payload } = query;
  switch (type) {
    case QueryType.FETCH_USER_RECORDS: {
      const bookmarks = await getBookmarks();
      const courseData = payload.courseIds.map((courseId: string) => {
        return {
          courseId,
          isBookmarked: !!bookmarks.find(record => courseId === record.courseId)
        }
      })
      return {
        type: RESPONSE_TYPE.FETCHED_USER_RECORDS, payload: courseData
      }
    }
    default: {
      return [];
    }
  }
}
