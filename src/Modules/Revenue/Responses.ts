import { ReturnResponse } from "../../base/responsesData";
import { Revenue } from "./entity";

export type RevenueResponse = {
  message: string;
  description: string;
  statusCode: number;
  revenue?: Revenue[];
  id?: number;
};

export const returnResponse: ReturnResponse<RevenueResponse> = {
  RC_PR_NI: { message: "Receitas listadas!", description: ".", statusCode: 200 }, //Revenue controller - Project Response - Nutri Invalid
  RC_PR_NC: { message: "Receita criada com sucesso!", description: ".", statusCode: 200 }, //Revenue controller - Project Response - Nutri Created
  RC_PR_NU: { message: "Receita editada!", description: ".", statusCode: 200 }, //Revenue controller - Project Response - Nutri Updated
  RC_PR_ND: { message: "Receitas deletada!", description: ".", statusCode: 200 }, //Revenue controller - Project Response - Nutri Delete
};
