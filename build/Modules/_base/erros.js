"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../middlewares/errorHandler");
const errosLogin = {
    ERR: {
        message: "Informe um usuario para seguir.",
        description: "Voce deve informar um @ de usuario para seguir.",
        statusCode: 400,
    },
};
Object.assign(errorHandler_1.descErrors, errosLogin);
