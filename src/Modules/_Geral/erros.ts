import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errosLogin: DescErrors = {
  "GC-E-PNE": {
    message: "Postagem não existe!", //Geral Service - Error - Post Not Exists
    description: "",
    statusCode: 400,
  },
  "GC-E-UNF": {
    message: "Usuario não existe!", //Geral Service - Error - User/s Not Found
    description: "",
    statusCode: 400,
  },
  "GC-E-UNS": {
    message: "Você não tem permissão para ver esse post!", //Geral Service - Error - User/s not see
    description: "",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosLogin);
