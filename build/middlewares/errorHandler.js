"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.descErrors = void 0;
exports.descErrors = {
    "PE-UNKW": {
        message: "Aconteceu um erro.",
        description: "Houve um erro ao tentar realizar sua solicitação tente novamente mais tarde.",
        statusCode: 400,
    },
    "PE-NLTA": {
        message: "Você precisa estar logado!",
        description: "Você precisa estar logado, para pode acessar esta pagina.",
        statusCode: 400,
    },
};
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let errorResponse = {
        statusCode: statusCode,
        message: err.message,
    };
    if (exports.descErrors[err.message]) {
        const descError = exports.descErrors[err.message];
        statusCode = descError.statusCode;
        errorResponse = {
            statusCode: descError.statusCode,
            message: descError.message,
            description: descError.description,
        };
    }
    if (process.env.STATUS === "DEV" || process.env.SHOWSTACK == "1") {
        errorResponse.stack = err.stack;
    }
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
