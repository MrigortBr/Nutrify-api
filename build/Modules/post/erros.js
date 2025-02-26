"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../middlewares/errorHandler");
const errosLogin = {
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
Object.assign(errorHandler_1.descErrors, errosLogin);
