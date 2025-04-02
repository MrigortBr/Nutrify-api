import { ReturnResponse } from "../../base/responsesData";
import { NutriHour } from "./Entity";

export type NutriHourResponse = {
  message: string;
  description: string;
  statusCode: number;
  hours?: NutriHour[];
  id?: number;
};

export const returnResponse: ReturnResponse<NutriHourResponse> = {
  NH_PR_HR: { message: "Horario listado!", description: ".", statusCode: 200 }, //Fallow controller - Project Response - Hour Response
  NH_PR_HU: { message: "Horario Atualizado!", description: ".", statusCode: 200 }, //Fallow controller - Project Response - Hour Updated
  NH_PR_HD: { message: "Horario Removido!", description: ".", statusCode: 200 }, //Fallow controller - Project Response - Hour Deleted
};
