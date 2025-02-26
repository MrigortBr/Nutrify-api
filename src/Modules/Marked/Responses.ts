import { ReturnResponse } from "../../base/responsesData";
import { picture } from "../../entities/ProfileUser";

export type MarkedResponse = {
  message: string;
  description: string;
  statusCode: number;
  picture?: picture | picture[];
};

export const returnResponse: ReturnResponse<MarkedResponse> = {
  FC_PR_PML: { message: "Usuario seguido com sucesso!", description: ".", statusCode: 200 }, //Marked controller - Project Response - Posts Marked Listed
};
