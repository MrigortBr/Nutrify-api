"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../middlewares/errorHandler");
const errosLogin = {
    "PE-IFLR": { message: "Campos invalidos.", description: "Preencha todos os campos para poder realizar o registro.", statusCode: 400 },
    "PE-IFLR-NA": { message: "Campos invalidos.", description: "Preencha o campo de nome para realizar o registro.", statusCode: 400 },
    "PE-IFLR-EM": { message: "Campos invalidos.", description: "Preencha o campo de email para realizar o registro.", statusCode: 400 },
    "PE-IFLR-PW": { message: "Campos invalidos.", description: "Preencha o campo de senha para realizar o registro.", statusCode: 400 },
    "PG-23505-EM": {
        message: "Campos email já registrado.",
        description: "O Email informado ja foi registrado tente recuperar sua conta",
        statusCode: 400,
    },
    "PE-IFLL": { message: "Campos invalidos.", description: "Preencha todos os campos para poder realizar o login.", statusCode: 400 },
    "PE-IFLL-EM": { message: "Campos invalidos.", description: "Preencha o campo de email para realizar o login.", statusCode: 400 },
    "PE-IFLL-PW": { message: "Campos invalidos.", description: "Preencha o campo de senha para realizar o login.", statusCode: 400 },
    "PE-IPLL-PW": { message: "Conta não encontrada.", description: "A senha informada está incorreta.", statusCode: 400 },
    "PE-IELL-PW": { message: "Conta não encontrada.", description: "O email informado está incorreto.", statusCode: 400 },
    "PE-NPGJ": {
        message: "Não foi possivel realizar o login, tente novamente mais tarde.",
        description: "Houve um erro ao gerar o codigo de login nós estamos verificando, por favor tente mais tarde",
        statusCode: 400,
    },
};
Object.assign(errorHandler_1.descErrors, errosLogin);
