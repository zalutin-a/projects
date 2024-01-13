import { IdName } from "./id-name";
import { IdValue } from "./id-value";

//TODO move user and role to separate files when implement authentication

export enum Roles {
  admin = 1,
  approver,
  editor,
  visitor,
}

export type Role = IdName<number>

export interface UserShort {
  name: string;
  surname: string;
  _id: string;
  roles: Role[];
}

export interface Comment extends IdValue {
  date: Date;
  author: UserShort;
}