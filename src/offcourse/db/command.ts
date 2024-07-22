import { deleteBookmark, insertBookmark, insertCommand, insertCourse } from "@/offcourse/db/queries"
import { actionSchema, ActionType } from '@/offcourse/container/action';

export async function handleCommand(body: string) {
  const action = actionSchema.parse(body)
  const id = await insertCommand(action);
  const { type, payload } = action;
  switch (type) {
    case ActionType.ADD_BOOKMARK: {
      insertBookmark(payload);
      insertCourse(payload);
      break;
    }
    case ActionType.REMOVE_BOOKMARK: {
      deleteBookmark(payload);
      break;
    }
    default: {
      console.log(`${type}: IGNORED`);
    }
  }
  return id;
}
