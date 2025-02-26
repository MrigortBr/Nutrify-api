import { descErrors, DescErrors } from "../../middlewares/errorHandler";

const errorsReset: DescErrors = {
  "PE-EMIN": { message: "Email invalido.", description: "Envie um email valido ou que já esteja registrado.", statusCode: 400 },
  "PE-TKNF": {
    message: "Token enviado invalido.",
    description: "Tente abrir o link novamente se continuar o erro solicite a recuperação de senha novamente.",
    statusCode: 400,
  },
  "PE-PWNF": {
    message: "Senha invalida ou vazia.",
    description: "sua senha está vazia, preencha a senha antes de enviar.",
    statusCode: 400,
  },
  "PE-PWSE": {
    message: "Senha invalida, deve conter pelo menos 6 caracteres.",
    description: "Informe uma senha de 6 caracteres.",
    statusCode: 400,
  },
};

Object.assign(descErrors, errorsReset);
