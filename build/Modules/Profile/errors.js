"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../middlewares/errorHandler");
const errosLogin = {
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
};
Object.assign(errorHandler_1.descErrors, errosLogin);
