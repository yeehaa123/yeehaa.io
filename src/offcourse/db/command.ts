import { insertCommand } from "@/offcourse/db/queries"
import { deleteBookmark, insertBookmark, } from "@/offcourse/db/models/bookmark"
import { insertCourse } from "@/offcourse/db/models/course"
import { actionSchema, ActionType } from '@/offcourse/container/action';
import { deleteCompletion, insertCompletion } from "./models/completion";
import { insertNote } from "./models/note";

export async function handleCommand(body: string) {
  const action = actionSchema.parse(body)
  const id = await insertCommand(action);
  const { type, payload } = action;
  switch (type) {
    case ActionType.ADD_NOTE: {
      insertNote(payload);
      break;
    }
    case ActionType.COMPLETE_CHECKPOINT: {
      insertCompletion(payload);
      insertCourse(payload);
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
