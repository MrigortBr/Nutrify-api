import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errosLogin: DescErrors = {
  "PC-E-ND": {
    message: "Dados não foram enviados corretamente",
    description: "",
    statusCode: 400,
  },
  "PC-E-NU": {
    message: "Usuario informado é invalido",
    description: "",
    statusCode: 400,
  },
  "PC-E-AF": {
    message: "Conta não encontrada.",
    description: "Conta informada nao encontrada.",
    statusCode: 400,
  },
  "PC-E-PW": {
    message: "Senha Invalida.",
    description: ".",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosLogin);
