import DatabaseConnection from "../../data/connection";
import { NutriHour } from "../nutriHours/Entity";
import { NutriLast, NutriOpen } from "./entity";
import NutriModel from "./Model";

export default class NutriService {
  private model: NutriModel;

  constructor() {
    this.model = new NutriModel(DatabaseConnection.getInstance());
  }

  async listNutri() {
    const r = await this.model.listAllNutri();
    return r;
  }

  async MarkInquiry(userId: number | undefined, nutriId: number | undefined, hourid: number | undefined) {
    if (!userId) throw new Error("NC-E-NN");
    if (!nutriId) throw new Error("NC-E-NN");
    if (!hourid) throw new Error("NC-E-NN");

    const r = await this.model.MarkInquiry(userId, nutriId, hourid);
    return r;
  }

  async getMyServiceLast(userId: number | undefined): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");
    const r = await this.model.getMyServiceLast(userId);
    return r;
  }

  async getMyServiceLastNutri(userId: number | undefined): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");
    const r = await this.model.getMyServiceLastNutri(userId);
    return r;
  }

  async getMyServiceOpen(userId: number | undefined): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");
    const r = await this.model.getMyServiceOpen(userId);
    return r;
  }

  async getMyServiceOpenNutri(userId: number | undefined): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");
    const r = await this.model.getMyServiceOpenNutri(userId);
    return r;
  }
}
