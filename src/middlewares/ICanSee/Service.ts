import DatabaseConnection from "../../data/connection";
import jwt from "jsonwebtoken";
import { ICanSeeModel } from "./Model";
import { User } from "../../entities/users";
import { TICanSeePlan } from "./type";

type Key = {
  id: number;
  iat: number;
};

export class AuthorizationService {
  private model: ICanSeeModel;

  constructor() {
    this.model = new ICanSeeModel(DatabaseConnection.getInstance());
  }

  async ICanSeePlan(myId: number, username: string): Promise<TICanSeePlan> {
    if (!username) throw new Error("CS-USIN");

    const user = await this.model.findByUsername(username);

    if (!user) throw new Error("CS-USIN");

    const r = await this.model.iCanSeePlan(myId, user.id, user.whoseemyplanning);

    r.userid = user.id;

    return r;
  }
}
