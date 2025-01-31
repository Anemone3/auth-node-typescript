import { RoleType } from "../../entities/user-entity";

export interface PayloadToken {
  role: RoleType;
  sub: string;
}

