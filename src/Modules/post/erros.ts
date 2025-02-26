import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errosLogin: DescErrors = {
  "PC-E-PNE": {
    message: "Postagem não existe",
    description: "",
    statusCode: 400,
  },
  "PC-E-CNE": {
    message: "Comentario invalido",
    description: "",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosLogin);
