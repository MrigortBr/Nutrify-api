import { ReturnResponse } from "../../base/responsesData";

export type ResponseReset = {
  message: string;
  description: string;
  statusCode: number;
};

export const returnResponse: ReturnResponse<ResponseReset> = {
  RP_PR_LSS: {
    message: "O link de restauração foi enviado para seu email!",
    description: "O link de restauração foi enviado para o email informado, chque em todas as caixas de entrada",
    statusCode: 200,
  }, //Reset Password - Project Response - Link Sended Successful
  RP_PR_PCS: {
    message: "Sua senha foi alterado com sucesso!",
    description: "Sua senha foi alterada com sucesso, realize o login com a senha nova.",
    statusCode: 200,
  }, //Reset Password - Project Response - Password Cahange Successful
};
