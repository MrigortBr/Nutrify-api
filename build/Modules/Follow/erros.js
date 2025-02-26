"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../middlewares/errorHandler");
const errosLogin = {
    "FC-E-NU": {
        message: "Informe um usuario para seguir.",
        description: "Voce deve informar um @ de usuario para seguir.",
        statusCode: 400,
    },
    "FC-E-UNF": {
        message: "Usuario informado não encontrado!",
        description: "Você deve informar um usuario valido para poder seguir.",
        statusCode: 400,
    },
    "FC-E-UHFU": {
        message: "Você já segue esse usuario!",
        description: "Você ja segue esse usuario.",
        statusCode: 400,
    },
};
Object.assign(errorHandler_1.descErrors, errosLogin);
