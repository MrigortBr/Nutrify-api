import { ReturnResponse } from "../../base/responsesData";
import { NutriHour, NutriOverview } from "./Entity";

export type NutriHourResponse = {
  message: string;
  description: string;
  statusCode: number;
  hours?: NutriHour[];
  nutriOverview?: NutriOverview;
  id?: number;
};

export const returnResponse: ReturnResponse<NutriHourResponse> = {
  NC_PR_OV: { message: "Visao geral listados!", description: ".", statusCode: 200 }, //Nutri Controller - Project Response - Overview

  NH_PR_HR: { message: "Horario listado!", description: ".", statusCode: 200 }, //Fallow controller - Project Response - Hour Response
  NH_PR_HU: { message: "Horario Atualizado!", description: ".", statusCode: 200 }, //Fallow controller - Project Response - Hour Updated
  NH_PR_HD: { message: "Horario Removido!", description: ".", statusCode: 200 }, //Fallow controller - Project Response - Hour Deleted
};
