import knex, { Knex } from "knex";
import { User } from "../../entities/users";

export class AuthorizationModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.db("users").select("*").where({ id: id }).first();
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}
