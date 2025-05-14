import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errosContact: DescErrors = {
  reload: {
    message: "Ocorreu um erro desconhecido, tente novamente mais tarde",
    description: "",
    statusCode: 400,
  },
};

Object.assign(descErrors, errosContact);
