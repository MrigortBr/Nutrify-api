import { Knex } from "knex";
import { ConfigNutri, NutriLast, NutriOpen, nutriSimple } from "./entity";

export default class NutriModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async listAllNutri(): Promise<nutriSimple[]> {
    try {
      const knex = this.db; // captura fora da função

      const r: nutriSimple[] = await this.db
        .table("user_crn")
        .select(
          "user_crn.id as nutri_id",
          "user_crn.price",
          "users.picture",
          "users.name",
          knex.raw(`
          COALESCE(AVG(CASE WHEN user_nutri.rating < 6 THEN user_nutri.rating ELSE NULL END), 0) as rating
        `),
          knex.raw(`
          COUNT(CASE WHEN user_nutri.rating < 6 THEN 1 ELSE NULL END) as number_service
        `),
        )
        .leftJoin("users", "users.id", "user_crn.user_id")
        .leftJoin("user_nutri", "user_nutri.nutri_id", "user_crn.id")
        .where("user_crn.open", true)
        .groupBy("user_crn.id", "users.id");
      return r;
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async MarkInquiry(userId: number, nutri_id: number, hourid: number, price: number) {
    try {
      this.db.transaction(async (db) => {
        await db("user_nutri").insert({
          user_id: userId,
          nutri_id: nutri_id,
          id: hourid,
          price: price,
        });

        await db("nutri_hour").update({ void: false }).where({ id: hourid });
      });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getMyServiceLast(user_id: number): Promise<NutriOpen[]> {
    try {
      return await this.db("user_nutri")
        .select(
          "user_nutri.id",
          "user_nutri.user_id",
          "user_nutri.nutri_id",
          "nutri_hour.service_init",
          "nutri_hour.service_final",
          "users.name",
          "user_nutri.price",
          "user_nutri.finished",
          "users.picture",
          "user_nutri.rating",
        )
        .join("nutri_hour", "nutri_hour.id", "user_nutri.id")
        .join("user_crn", "user_crn.id", "user_nutri.nutri_id")
        .leftJoin("users", "users.id", "user_crn.user_id")
        .where("user_nutri.user_id", user_id)
        .andWhere("user_nutri.finished", true);
    } catch (error) {
      console.log(error);
      throw new Error("PE-UNKW");
    }
  }

  async getMyServiceOpen(user_id: number): Promise<NutriOpen[]> {
    try {
      return await this.db("user_nutri")
        .select(
          "user_nutri.id",
          "user_nutri.user_id",
          "user_nutri.nutri_id",
          "nutri_hour.service_init",
          "nutri_hour.service_final",
          "users.name",
          "user_nutri.finished",
          "users.picture",
        )
        .join("nutri_hour", "nutri_hour.id", "user_nutri.id")
        .join("user_crn", "user_crn.id", "user_nutri.nutri_id")
        .leftJoin("users", "users.id", "user_crn.user_id")
        .where("user_nutri.user_id", user_id)
        .andWhere("user_nutri.finished", false);
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getMyServiceLastNutri(user_id: number, date: Date): Promise<NutriOpen[]> {
    const NewDate = date.toISOString().split("T")[0];
    const dateFinal = `${NewDate}T23:59:59.999Z`;

    try {
      return await this.db("user_nutri")
        .select(
          "user_nutri.id",
          "user_nutri.user_id",
          "user_nutri.nutri_id",
          "nutri_hour.service_init",
          "nutri_hour.service_final",
          "users.name",
          "users.username",
          "users.picture",
          "user_nutri.finished",
          "user_nutri.rating",
        )
        .join("nutri_hour", "nutri_hour.id", "user_nutri.id")
        .leftJoin("users", "users.id", "user_nutri.user_id")
        .where("user_nutri.nutri_id", user_id)
        .andWhere("user_nutri.finished", true)
        .andWhere((builder) => {
          builder.where("nutri_hour.service_init", ">=", date).andWhere("nutri_hour.service_final", "<=", dateFinal);
        });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getMyServiceOpenNutri(user_id: number, startUtc: string, endUtc: string): Promise<NutriOpen[]> {
    try {
      return await this.db("user_nutri")
        .select(
          "user_nutri.id",
          "user_nutri.user_id",
          "user_nutri.nutri_id",
          "nutri_hour.service_init",
          "nutri_hour.service_final",
          "users.name",
          "users.username",
          "users.picture",
          "user_nutri.finished",
        )
        .join("nutri_hour", "nutri_hour.id", "user_nutri.id")
        .leftJoin("users", "users.id", "user_nutri.user_id")
        .where("user_nutri.nutri_id", user_id)
        .andWhere("user_nutri.finished", false)
        .andWhere((builder) => {
          builder.where("nutri_hour.service_init", ">=", startUtc).andWhere("nutri_hour.service_final", "<=", endUtc);
        });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async finishNutri() {}

  async getMyConfigs(id: number, user_id: number): Promise<ConfigNutri> {
    try {
      return await this.db("user_crn").select("user_crn.price as price", "user_crn.open as acceptClients").where({ id, user_id }).first();
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async updatePrice(id: number, user_id: number, price: number) {
    try {
      return await this.db("user_crn").where({ id, user_id }).update({ price });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async updateAcceptClients(id: number, user_id: number, open: boolean) {
    try {
      return await this.db("user_crn").where({ id, user_id }).update({ open });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}
