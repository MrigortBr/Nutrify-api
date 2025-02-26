import { ReturnResponse } from "../../base/responsesData";

export type responseFollow = {
  message: string;
  description: string;
  statusCode: number;
};

export const returnResponse: ReturnResponse<responseFollow> = {
  FC_PR_UF: { message: "Usuario seguido com sucesso!", description: ".", statusCode: 200 }, //Follow controller - Project Response - Username Follow
  FC_PR_UUF: { message: "Voce parou de seguir o usuario!", description: ".", statusCode: 200 }, //Follow controller - Project Response - Username Unfollow
};
