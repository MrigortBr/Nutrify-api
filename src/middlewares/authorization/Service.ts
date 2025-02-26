import DatabaseConnection from "../../data/connection";
import jwt from "jsonwebtoken";
import { AuthorizationModel } from "./Model";
import { User } from "../../entities/users";

type Key = {
  id: number;
  iat: number;
};

export class AuthorizationService {
  private model: AuthorizationModel;

  constructor() {
    this.model = new AuthorizationModel(DatabaseConnection.getInstance());
  }

  async decodeJWT(jwtOld: string): Promise<number> {
    const jwtKey = jwtOld.replace("Bearer ", "");

    const decode = (await jwt.decode(jwtKey)) as Key | null;

    if (!decode) throw new Error("PE-NLTA");

    let id = decode.id;

    return id;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.model.findById(id);

    if (!user) throw new Error("PE-NLTA");

    return user;
  }

  async userExists(id: number) {}
}
