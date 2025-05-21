import DatabaseConnection from "../../data/connection";
import { NutriHour } from "../nutriHours/Entity";
import { ConfigNutri, NutriLast, NutriOpen } from "./entity";
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

  async MarkInquiry(userId: number | undefined, nutriId: number | undefined, hourid: number | undefined, price: string | undefined) {
    if (!userId) throw new Error("NC-E-NN");
    if (!nutriId) throw new Error("NC-E-NN");
    if (!hourid) throw new Error("NC-E-NN");
    if (!price) throw new Error("NC-E-NN");


    const r = await this.model.MarkInquiry(userId, nutriId, hourid, Number(price));
    return r;
  }

  async getMyServiceLast(userId: number | undefined): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");
    const r = await this.model.getMyServiceLast(userId);
    return r;
  }

  async getMyServiceLastNutri(userId: number | undefined, date: string | undefined | any): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");

    let dateObj = new Date();

    if (date && typeof date == "string") dateObj = new Date(date);

    const r = await this.model.getMyServiceLastNutri(userId, dateObj);
    return r;
  }

  async getMyServiceOpen(userId: number | undefined): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");
    const r = await this.model.getMyServiceOpen(userId);
    return r;
  }

  async getMyServiceOpenNutri(userId: number | undefined, date: string | undefined | any): Promise<NutriOpen[]> {
    if (!userId) throw new Error("NC-E-NN");

    let dateObj = new Date();

    if (date && typeof date == "string") dateObj = new Date(date);

    const r = await this.model.getMyServiceOpenNutri(userId, dateObj);
    return r;
  }

  async getMyConfigs(nutrId: number | undefined, userId: number | undefined): Promise<ConfigNutri> {
    if (!userId) throw new Error("NC-E-NN");
    if (!nutrId) throw new Error("NC-E-NN");
    const r = await this.model.getMyConfigs(nutrId, userId);
    return r;
  }

  async updateMyConfigs(
    nutrId: number | undefined,
    userId: number | undefined,
    price: number | undefined,
    acceptClients: boolean | undefined,
  ): Promise<boolean> {
    if (!userId) throw new Error("NC-E-NN");
    if (!nutrId) throw new Error("NC-E-NN");
    let response: boolean = false;

    if (price != undefined) {
      const auto = await this.model.updatePrice(nutrId, userId, price);
      if (auto > 0) response = true;
    }

    if (acceptClients != undefined) {
      const clients = await this.model.updateAcceptClients(nutrId, userId, acceptClients);
      if (clients > 0) response = true;
    }

    if (!response) throw new Error("reload");

    return response;
  }
}
