import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errosPlan: DescErrors = {
  ERR: {
    message: "Informe um usuario para seguir.",
    description: "Voce deve informar um @ de usuario para seguir.",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosPlan);
