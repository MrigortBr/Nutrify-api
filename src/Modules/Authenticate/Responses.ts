import { ReturnResponse } from "../../base/responsesData";

export type responseLogin = {
  message: string;
  description: string;
  jwt: string;
  type: "user" | "nutri";
  statusCode: number;
};

export const returnResponse: ReturnResponse<responseLogin> = {
  AC_PR_RASU: {
    message: "Conta registrada com sucesso!",
    description: "Conta registrada com sucesso.",
    jwt: "",
    statusCode: 200,
    type: "user",
  }, //Authenticate controller - Project Response - Register Account Successful
  AC_PR_LASU: {
    message: "Login realizado com sucesso!",
    description: "Conta registrada com sucesso.",
    jwt: "",
    statusCode: 200,
    type: "user",
  }, //Authenticate controller - Project Response - Login Account Successful
    AC_PR_EA: {
    message: "Conta verificada com sucesso!",
    description: "Sua conta foi verificada.",
    jwt: "",
    statusCode: 200,
    type: "user",
  }, //Authenticate controller - Project Response - Email Authenticate
};

