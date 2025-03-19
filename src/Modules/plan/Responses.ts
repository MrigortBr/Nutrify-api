import { ReturnResponse } from "../../base/responsesData";
import { picture } from "../../entities/ProfileUser";
import { planFood } from "./types";

export type PlanResponse = {
  message: string;
  description: string;
  statusCode: number;
  idPlan?: number;
  plans?: planFood[];
};

export const returnResponse: ReturnResponse<PlanResponse> = {
  PC_PR_PCS: { message: "Plano Cadastrado", description: ".", statusCode: 200 }, //Plan Controller - Plan Response - Plan Created sucess
  PC_PR_PLS: { message: "Plano listado", description: ".", statusCode: 200 }, //Plan Controller - Plan Response - Plan listed sucess
  PC_PR_PUS: { message: "Plano atualizado", description: ".", statusCode: 200 }, //Plan Controller - Plan Response - Plan updated sucess
  PC_PR_PDS: { message: "Item Deletado", description: ".", statusCode: 200 }, //Plan Controller - Plan Response - Plan Deleted sucess
};
