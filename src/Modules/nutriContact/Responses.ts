import { ReturnResponse } from "../../base/responsesData";
import { NutriLast, NutriOpen, nutriSimple } from "./entity";

export type NutriResponse = {
  message: string;
  description: string;
  statusCode: number;
  nutriSimple?: nutriSimple[];
  servicesOpen?: NutriOpen[];
  servicesLast?: NutriOpen[];
};

export const returnResponse: ReturnResponse<NutriResponse> = {
  NC_PR_NL: { message: "Nutricionistas listados!", description: ".", statusCode: 200 }, //Nutri Controller - Project Response - Nutri Listed
  NC_PR_HM: { message: "Horario marcado!", description: ".", statusCode: 200 }, //Nutri Controller - Project Response - HM
};
