import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errosNutriHours: DescErrors = {
  "NC-E-NP": {
    message: "Informe uma data valida!",
    description: "",
    statusCode: 400,
  },
  "NC-E-NN": {
    message: "Você não é um nutricionista!",
    description: "",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosNutriHours);
