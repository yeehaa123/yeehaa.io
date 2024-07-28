import { RESPONSE_TYPE, responseSchema } from "../response";
import type { AuthState } from "../schema";

export async function authenticate(authData: AuthState) {
  sessionStorage.setItem("auth", JSON.stringify(authData));
  const response = responseSchema.parse({
    type: RESPONSE_TYPE.AUTHENTICATED,
    payload: authData
  })
  return response;
}
export async function logout() {
  sessionStorage.removeItem("auth");
  const response = responseSchema.parse({
    type: RESPONSE_TYPE.lOGGED_OUT,
    payload: undefined
  })
  return response;
}

export function getAuthData() {
  const data = sessionStorage.getItem("auth");
  if (data) {
    return JSON.parse(data) as AuthState
  }
  return undefined;
}
