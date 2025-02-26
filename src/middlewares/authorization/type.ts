import { Request } from "express";
import { User } from "../../entities/users";

export interface RequestAuthorized extends Request {
  user?: User; // Troque `any` pelo tipo correto do usuário
}
