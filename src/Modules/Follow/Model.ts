import { Knex } from "knex";

export default class FollowModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async findUserByUsername(username: string): Promise<number> {
    try {
      const response = await this.db("users").select("id").where({ username }).first();
      if (!response) throw new Error("FC-E-UNF");
      return response.id;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async followUser(follower: number, following: number) {
    try {
      return await this.db("user_follow_user").insert({ follower, following });
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async unfollowUser(follower: number, following: number) {
    try {
      return await this.db("user_follow_user").delete().where({ follower, following });
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }
}
