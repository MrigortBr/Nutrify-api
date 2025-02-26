"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Authorization;
const Service_1 = require("./Service");
require("../errorHandler");
function Authorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken)
                throw new Error("PE-NLTA");
            const service = new Service_1.AuthorizationService();
            const id = yield service.decodeJWT(bearerToken);
            const user = yield service.getUser(id);
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
