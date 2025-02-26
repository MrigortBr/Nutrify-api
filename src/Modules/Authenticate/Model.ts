import knex, { Knex } from "knex";
import { IUser } from "../../entities/users";
import { IRegisterUser } from "../../entities/RegisterUser";

class UserModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    try {
      const user = (await this.db("users").where({ email }).first()) as IUser;

      if (!user) throw new Error("PE-IELL-PW");

      return user;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async registerUser(user: IRegisterUser): Promise<{ id: number }> {
    try {
      const result = await this.db("users").insert(user).returning("id");
      return result[0];
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("PG-23505-EM");
      }
      throw new Error("PE-UNKW");
    }
  }
}

export { IUser, UserModel };
