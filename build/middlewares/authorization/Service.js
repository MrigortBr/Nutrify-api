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
exports.AuthorizationService = void 0;
const connection_1 = __importDefault(require("../../data/connection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Model_1 = require("./Model");
class AuthorizationService {
    constructor() {
        this.model = new Model_1.AuthorizationModel(connection_1.default.getInstance());
    }
    decodeJWT(jwtOld) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtKey = jwtOld.replace("Bearer ", "");
            const decode = (yield jsonwebtoken_1.default.decode(jwtKey));
            if (!decode)
                throw new Error("PE-NLTA");
            let id = decode.id;
            return id;
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findById(id);
            if (!user)
                throw new Error("PE-NLTA");
            return user;
        });
    }
    userExists(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthorizationService = AuthorizationService;
