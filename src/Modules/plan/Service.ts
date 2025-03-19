import DatabaseConnection from "../../data/connection";
import GeralService from "../_Geral/Service";
import { PlanResponse, returnResponse } from "./Responses";
import PlanModel from "./Model";
import { planFood } from "./types";
import { ReturnResponse } from "../../base/responsesData";
import { NextFunction } from "express";

export default class PlanService {
  private model: PlanModel;
  private Geral: GeralService;

  constructor() {
    this.model = new PlanModel(DatabaseConnection.getInstance());
    this.Geral = new GeralService();
  }

  async getPlan(userid: number, searchDate: string): Promise<PlanResponse> {
    const plans = await this.model.getByUsername(userid, searchDate);

    const response = returnResponse["PC_PR_PLS"];
    response.plans = plans;

    return response;
  }

  async insertPlan(idUser: number, plan: planFood): Promise<PlanResponse> {
    const id = await this.model.insert(idUser, plan);

    const response = returnResponse["PC_PR_PCS"];

    response.idPlan = id;

    return response;
  }

  async updatePlan(idUser: number, plan: planFood): Promise<PlanResponse> {
    await this.model.update(idUser, plan);

    const response = returnResponse["PC_PR_PUS"];
    return response;
  }

  async markerPlan(idUser: number, idPlan: number, marked: boolean): Promise<PlanResponse> {
    await this.model.mark(idUser, idPlan, marked);

    const response = returnResponse["PC_PR_PUS"];
    return response;
  }

  async deletePlan(idUser: number, idPlan: number): Promise<PlanResponse> {
    await this.model.delete(idUser, idPlan);
    const response = returnResponse["PC_PR_PDS"];
    return response;
  }
}
