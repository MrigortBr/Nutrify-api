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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateService = void 0;
const ServiceAll_1 = require("../../base/ServiceAll");
const connection_1 = __importDefault(require("../../data/connection"));
const RegisterUser_1 = require("../../entities/RegisterUser");
const SendedUser_1 = require("../../entities/SendedUser");
const Model_1 = require("./Model");
const Responses_1 = require("./Responses");
require("./erros");
class AuthenticateService {
    constructor() {
        this.model = new Model_1.UserModel(connection_1.default.getInstance());
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sendedUser = new SendedUser_1.SendedUser(email, password);
            const user = yield this.model.getUserByEmail(sendedUser.email);
            if (user != null) {
                yield sendedUser.validatePassword(user);
            }
            else {
                throw new Error("PE-IELL-PW");
            }
            sendedUser.generateJWT();
            if (sendedUser.jwtKey == undefined)
                throw new Error("PE-NPGJ");
            const response = Responses_1.returnResponse["AC_PR_LASU"];
            response.jwt = sendedUser.jwtKey;
            return response;
        });
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerUser = yield RegisterUser_1.RegisterUser.create({
                email: email,
                name: name,
                password: password,
            });
            const idUser = yield this.model.registerUser(registerUser);
            registerUser.sayWelcome();
            const jwtKey = yield (0, ServiceAll_1.generateKeyJWT)(idUser.id);
            const response = Responses_1.returnResponse["AC_PR_RASU"];
            response.jwt = jwtKey;
            return response;
        });
    }
}
exports.AuthenticateService = AuthenticateService;
