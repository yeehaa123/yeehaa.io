import type { Dispatch } from "react";
import type { Response } from "../response";
import { responseSchema, RESPONSE_TYPE } from "../response";
import { ActionType, type Action } from "./action";

export function responder(dispatch: Dispatch<Action>) {
  return (response: Response) => {
    const { type, payload } = responseSchema.parse(response);
    switch (type) {
      case RESPONSE_TYPE.AUTHENTICATED: {
        dispatch({ type: ActionType.ADD_AUTH_DATA, payload })
        break;
      }
      case RESPONSE_TYPE.lOGGED_OUT: {
        dispatch({ type: ActionType.LOG_OUT, payload })
        break;
      }
      case RESPONSE_TYPE.FETCHED_USER_RECORDS: {
        dispatch({ type: ActionType.ADD_USER_DATA, payload })
        break;
      }
      case RESPONSE_TYPE.NO_OP: {
        console.log(type, "NOTHING TO DO");
        break;
      }
    }
  }
}
