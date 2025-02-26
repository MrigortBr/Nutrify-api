import { Knex } from "knex";

export default class BaseModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async unfallowUser(follower: number, following: number) {
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
