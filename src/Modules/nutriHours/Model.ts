import { Knex } from "knex";
import { NutriHour, NutriOverview } from "./Entity";

export default class NutriHourModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getForDate(date: Date, nutriId: number): Promise<NutriHour[]> {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const r: NutriHour[] = await this.db("nutri_hour")
        .select("*")
        .where("nutri_id", nutriId)
        .andWhereRaw("DATE(service_init) = ?", [formattedDate]);
      return r;
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getForDateAndId(date: Date, nutriId: string): Promise<NutriHour[]> {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const r: NutriHour[] = await this.db("nutri_hour")
        .select("*")
        .where({ nutri_id: nutriId, void: true })
        .andWhereRaw("DATE(service_init) = ?", [formattedDate]);
      return r;
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async updateHoursById(nutriId: number, data: NutriHour) {
    try {
      console.log(data);
      const r = await this.db("nutri_hour")
        .update({
          service_init: data.service_init,
          service_final: data.service_final,
        })
        .where({ id: data.id, nutri_id: nutriId });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async overview(nutri_id: number): Promise<NutriOverview> {
    try {
      const r = await this.db("user_nutri")
        .select(
          this.db.raw("SUM(user_nutri.price) as sales"),
          this.db.raw("COUNT(user_nutri.id) as services"),
          this.db.raw(`
          COALESCE(AVG(CASE WHEN user_nutri.rating < 6 THEN user_nutri.rating ELSE NULL END), 0) as rating
        `),
        )
        .where({ nutri_id });
      return r[0];
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async createHours(nutriId: number, data: NutriHour, price: number) {
    try {
      const r: { id: number }[] = await this.db("nutri_hour")
        .insert({
          service_init: data.service_init,
          service_final: data.service_final,
          nutri_id: nutriId,
          price: price,
        })
        .returning("id");

      return r[0].id;
    } catch (error) {
      console.log(error);
      throw new Error("PE-UNKW");
    }
  }

  async getValueForNutri(id: number): Promise<{ price: number }> {
    try {
      return await this.db("user_crn").select("price").where({ id }).first();
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async deletehour(nutriId: number, id: string) {
    try {
      await this.db("nutri_hour").delete().where({ id: id, nutri_id: nutriId });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}
