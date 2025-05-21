import knex, { Knex } from "knex";
import { CRN, IUser } from "../../entities/users";
import { IRegisterUser } from "../../entities/RegisterUser";

class UserModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    try {
      const user = (await this.db("users").where({ email, checked: true}).first()) as IUser;

      if (!user) throw new Error("PE-IELL-PW");

      return user;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async userIsNutri(userid: number): Promise<{ id: number }> {
    try {
      const result = await this.db("user_crn").where({ user_id: userid }).select("id");
      return result[0];
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("PG-23505-EM");
      }
      throw new Error("PE-UNKW");
    }
  }

  async registerUser(user: IRegisterUser): Promise<{ id: number }> {
    try {
      const result = await this.db("users").insert(user).returning("id");
      return result[0];
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("PG-23505-EM");
      }
      throw new Error("PE-UNKW");
    }
  }

  async userVerifyEmail(id: number): Promise<{ checked: boolean }> {
    try {
      const result = await this.db("users").select("checked").where({ id }).first();
      return result;
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("PG-23505-EM");
      }
      console.log(error);
      throw new Error("PE-UNKW");
    }
  }

  async verifyEmail(id: number, name: string, email: string) {
    try {
      await this.db("users").update({ checked: true }).where({ checked: false, id, name, email });
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("PG-23505-EM");
      }
      console.log(error);
      throw new Error("PE-UNKW");
    }
  }

  async deleteUser(id: number) {
    try {
      await this.db("users").delete().where({ id });
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("PG-23505-EM");
      }
      throw new Error("PE-UNKW");
    }
  }

  async registerNutri(user: IRegisterUser, crn: CRN, typeCRN: string): Promise<{ id: number }> {
    try {
      const result = await this.db.transaction(async (db) => {
        const userid: { id: number }[] = await db("users").insert(user).returning("id");

        await db("user_crn").insert({ crn, typeCRN, user_id: userid[0].id });

        return userid;
      });
      return result[0];
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        const table = (error as { table: string }).table;
        if (code == "23505") {
          if (table == "user_crn") {
            throw new Error("PG-23505-CR");
          } else {
            throw new Error("PG-23505-EM");
          }
        }
      }
      throw new Error("PE-UNKW");
    }
  }
}

export { IUser, UserModel };
