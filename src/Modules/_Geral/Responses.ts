import { ReturnResponse } from "../../base/responsesData";

export type GeralResponse = {
  message: string;
  description: string;
  statusCode: number;
};

export const returnResponse: ReturnResponse<GeralResponse> = {
  FC_PR_UF: { message: "Usuario seguido com sucesso!", description: ".", statusCode: 200 }, //Fallow controller - Project Response - Username Fallow
};
