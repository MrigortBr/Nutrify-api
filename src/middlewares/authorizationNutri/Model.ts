import knex, { Knex } from "knex";
import { User } from "../../entities/users";

export class AuthorizationNutriModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async findById(id: number): Promise<number> {
    try {
      const r = await this.db("user_crn").select("id").where({ user_id: id }).first();
      return r.id;
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}
