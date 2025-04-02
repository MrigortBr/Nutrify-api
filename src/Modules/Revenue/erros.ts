import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errosRevenue: DescErrors = {
  "RE-E-NC": {
    message: "Você não pode alterar esses dados pois já se passaram as 48 horas.",
    description: "RENC",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosRevenue);
