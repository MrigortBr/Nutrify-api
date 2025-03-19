import { Knex } from "knex";
import { planFood } from "./types";

export default class PlanModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getByUsername(userid: number, searchDate: string): Promise<planFood[]> {
    try {
      const startOfDay = `${searchDate} 00:00:00`;
      const endOfDay = `${searchDate} 23:59:59`;

      return await this.db("user_plan")
        .select("*")
        .returning("id")
        .where({ user_id: userid })
        .andWhere(function () {
          this.whereBetween("dateInit", [startOfDay, endOfDay]).andWhereBetween("dateFinal", [startOfDay, endOfDay]);
        });
    } catch (e) {
      console.log(e);
      throw new Error("PE-UNKW");
    }
  }

  async update(idUser: number, plan: planFood) {
    try {
      await this.db("user_plan")
        .update({
          picture: plan.picture,
          recipe: plan.recipe,
          nameType: plan.nameType,
          dateInit: plan.dateInit,
          dateFinal: plan.dateFinal,
          name: plan.name,
          marked: plan.marked,
        })
        .where({ id: plan.id, user_id: idUser });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async mark(idUser: number, idPlan: number, marked: boolean) {
    try {
      await this.db("user_plan")
        .update({
          marked: marked,
        })
        .where({ id: idPlan, user_id: idUser });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async delete(idUser: number, idPlan: number) {
    try {
      await this.db("user_plan").delete().where({ id: idPlan, user_id: idUser });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async insert(idUser: number, plan: planFood): Promise<number> {
    try {
      const r: { id: number }[] = await this.db("user_plan")
        .insert({
          user_id: idUser,
          picture: plan.picture,
          recipe: plan.recipe,
          nameType: plan.nameType,
          dateInit: plan.dateInit,
          dateFinal: plan.dateFinal,
          name: plan.name,
          marked: false,
        })
        .returning("id");

      return r[0].id;
    } catch (e) {
      throw new Error("PE-UNKW");
    }
  }
}
