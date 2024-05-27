import {Topic} from "./topic";

export interface UserInfo{
  username?: string,
}


export interface UserData {
  username: string,
  email: string,
  topicsIds: Topic[],
}
