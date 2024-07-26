import { insertCommand, insertCourse } from "@/offcourse/db/queries"
import { deleteBookmark, insertBookmark, } from "@/offcourse/db/models/bookmark"
import { actionSchema, ActionType } from '@/offcourse/container/action';
import { deleteCompletion, insertCompletion } from "./models/competion";

export async function handleCommand(body: string) {
  const action = actionSchema.parse(body)
  const id = await insertCommand(action);
  const { type, payload } = action;
  switch (type) {
    case ActionType.COMPLETE_CHECKPOINT: {
      insertCompletion(payload);
      insertCourse(payload.course);
      break;
    }
    case ActionType.UNCOMPLETE_CHECKPOINT: {
      deleteCompletion(payload);
      break;
    }
    case ActionType.REMOVE_BOOKMARK: {
      deleteBookmark(payload);
      break;
    }
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
