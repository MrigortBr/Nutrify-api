import { Request } from "express";
import { User } from "../../entities/users";

export interface RequestAuthorized extends Request {
  user?: User;
  nutriId?: number;
}
