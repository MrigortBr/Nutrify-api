import DatabaseConnection from "../../data/connection";
import FollowModel from "./Model";
import { responseFollow, returnResponse } from "./Responses";

export default class FollowService {
  private model: FollowModel;

  constructor() {
    this.model = new FollowModel(DatabaseConnection.getInstance());
  }

  async follow(username: string, userId: number): Promise<responseFollow> {
    if (!username || !username.trim()) throw new Error("FC-E-NU");

    const id = await this.model.findUserByUsername(username);
    await this.model.followUser(userId, id);

    return returnResponse["FC_PR_UF"];
  }

  async unfollow(username: string, userId: number): Promise<responseFollow> {
    if (!username || !username.trim()) throw new Error("FC-E-NU");

    const id = await this.model.findUserByUsername(username);
    await this.model.unfollowUser(userId, id);

    return returnResponse["FC_PR_UUF"];
  }
}
