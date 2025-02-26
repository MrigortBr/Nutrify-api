import { Knex } from "knex";
import { IUser } from "../../entities/users";
import PasswordReset from "../../entities/PasswordReset";

class ResetModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getIdByEmail(email: string): Promise<IUser> {
    try {
      const user = (await this.db("users").where({ email }).first()) as IUser;

      if (!user) throw new Error("PE-EMIN");

      return user;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async createTokenToReset(passwordReset: PasswordReset): Promise<string> {
    try {
      const { token, user_id, status } = passwordReset;
      return await this.db("password_reset").insert({ token, user_id, status });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async closeAllTokens(passwordReset: PasswordReset) {
    try {
      return await this.db("password_reset").update({ status: "expired" }).where({ user_id: passwordReset.user_id, status: "open" });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getIdFromToken(token: string): Promise<number> {
    try {
      const result: { user_id: number } = await this.db("password_reset").select("user_id").where({ token: token, status: "open" }).first();

      if (result == undefined) {
        throw new Error("PE-TKNF");
      }

      return result.user_id;
    } catch (error) {
      throw new Error("PE-TKNF");
    }
  }

  async updatePasswordUserFromId(id: number, password: string) {
    try {
      return await this.db("users").update({ password }).where({ id: id });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async closeToken(token: string) {
    try {
      return await this.db("password_reset").update({ status: "closed" }).where({ token: token });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}

export default ResetModel;
