import { Knex } from "knex";
import { Revenue, RevenueDate, RevenuePlan } from "./entity";

export default class RevenueModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getRevenues(nutri_id: number): Promise<Revenue[]> {
    try {
      return await this.db("nutri_revenue").where({ nutri_id: nutri_id });
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async getRevenuesForClient(id: string, date: string): Promise<Revenue[]> {
    try {
      return await this.db("user_plan").where({ user_id: id }).andWhereRaw('DATE("dateFinal") = ?', [date]);
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async iCanEditThisUser(nutri_id: number, id: string) {
    try {
      const r: { service_final: Date } = await this.db("user_nutri")
        .select("nutri_hour.service_final")
        .join("nutri_hour", "nutri_hour.id", "user_nutri.id")
        .where({ "user_nutri.nutri_id": nutri_id, "user_nutri.user_id": id })
        .first();

      return r.service_final;
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async createRevenue(nutri_id: number, data: RevenueDate): Promise<number> {
    try {
      const r: { id: number }[] = await this.db("nutri_revenue")
        .insert({
          nutri_id: nutri_id,
          picture: data.picture,
          name: data.name,
          nameType: data.nameType,
          dateInit: data.dateInit,
          dateFinal: data.dateFinal,
          kcal: data.kcal,
          recipe: data.recipe,
        })
        .returning("id");

      return r[0].id;
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async createRevenueUser(nutriId: number, data: RevenuePlan[], id: string) {
    try {
      this.db.transaction(async (db) => {
        data.map(async (v) => {
          await this.db("user_plan").insert({
            user_id: id,
            picture: v.picture,
            name: v.name,
            nameType: v.nameType,
            dateInit: v.dateInit,
            dateFinal: v.dateFinal,
            kcal: v.kcal,
            recipe: v.recipe,
          });
        });
      });
    } catch (error) {
      console.log(error);
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async updateRevenue(nutri_id: number, data: Revenue) {
    try {
      await this.db("nutri_revenue")
        .update({
          picture: data.picture,
          name: data.name,
          nameType: data.typeRevenue,
          dateInit: data.initHour,
          dateFinal: data.finalHour,
          kcal: data.kcal,
          recipe: data.recipe,
        })
        .where({ nutri_id: nutri_id, id: data.id });
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }

  async deleteRevenue(nutri_id: number, id: string) {
    try {
      await this.db("nutri_revenue").delete().where({ nutri_id: nutri_id, id: id });
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        if (code == "23505") throw new Error("FC-E-UHFU");
      }
      throw new Error("PE-UNKW");
    }
  }
}
