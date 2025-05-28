import DatabaseConnection from "../../data/connection";
import { Revenue, RevenueDate, RevenuePlan } from "./entity";
import RevenueModel from "./Model";
import { RevenueResponse, returnResponse } from "./Responses";

export default class RevenueService {
  private model: RevenueModel;

  constructor() {
    this.model = new RevenueModel(DatabaseConnection.getInstance());
  }

  async getRevenues(nutriId: number | undefined): Promise<RevenueResponse> {
    if (!nutriId) throw new Error("NC-E-NN");

    const r = await this.model.getRevenues(nutriId);

    const response = returnResponse["RC_PR_NI"];
    response.revenue = r;
    return response;
  }

  async getRevenuesForClient(
    nutriId: number | undefined,
    userId: string | undefined,
    date: string | undefined,
    id: string | undefined,
  ): Promise<RevenueResponse> {
    if (!nutriId) throw new Error("NC-E-NN");
    if (!id) throw new Error("NC-E-NN");
    if (!date) throw new Error("NC-E-NN");
    if (!userId) throw new Error("NC-E-NN");

    const dateMax = await this.model.iCanEditThisClient(nutriId, userId, id);

    if (this.hasPassed48Hours(dateMax)) throw new Error("RE-E-NC");

    const r = await this.model.getRevenuesForClient(id, date);

    const response = returnResponse["RC_PR_NI"];
    response.revenue = r;
    return response;
  }

  async createRevenue(nutriId: number | undefined, data: RevenueDate | undefined): Promise<RevenueResponse> {
    if (!nutriId) throw new Error("NC-E-NN");
    if (!data) throw new Error("NC-E-NN");

    data.dateInit = this.toISOStringWithTime(data.dateInit);
    data.dateFinal = this.toISOStringWithTime(data.dateFinal);

    const r = await this.model.createRevenue(nutriId, data);

    const response = returnResponse["RC_PR_NC"];
    response.id = r;
    return response;
  }

  async createRevenueUser(nutriId: number | undefined, data: RevenuePlan[] | undefined, id: string | undefined): Promise<RevenueResponse> {
    if (!nutriId) throw new Error("NC-E-NN");
    if (!data) throw new Error("NC-E-NN");
    if (!id) throw new Error("NC-E-NN");

    const dateMax = await this.model.iCanEditThisUser(nutriId, id);
    //if (this.hasPassed48Hours(dateMax)) throw new Error("RE-E-NC");

    await this.model.createRevenueUser(nutriId, data, id);
    const response = returnResponse["RC_PR_NC"];
    return response;
  }

  async updateRevenue(nutriId: number | undefined, data: RevenuePlan | undefined): Promise<RevenueResponse> {
    if (!nutriId) throw new Error("NC-E-NN");
    if (!data) throw new Error("NC-E-NN");

    data.dateInit = this.toISOStringWithTime(data.dateInit);
    data.dateFinal = this.toISOStringWithTime(data.dateFinal);

    await this.model.updateRevenue(nutriId, data);

    const response = returnResponse["RC_PR_NU"];
    return response;
  }

  async deleteRevenue(nutriId: number | undefined, id: string | undefined): Promise<RevenueResponse> {
    if (!nutriId) throw new Error("NC-E-NN");
    if (!id) throw new Error("NC-E-NN");

    await this.model.deleteRevenue(nutriId, id);

    const response = returnResponse["RC_PR_ND"];
    return response;
  }

  private toISOStringWithTime(time: string): string {
    const date = `${new Date().toISOString().split("T")[0]}T${time}:00`;
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() - 3);
    return dateObj.toUTCString();
  }

  private hasPassed48Hours(date: Date): boolean {
    const now = new Date(); // Data atual
    const diffInMs = now.getTime() - date.getTime(); // Diferença em milissegundos
    const diffInHours = diffInMs / (1000 * 60 * 60); // Converte para horas

    return diffInHours >= 48; // Retorna true se passou de 48 horas
  }
}
