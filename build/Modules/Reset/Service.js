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
const ServiceAll_1 = require("../../base/ServiceAll");
const connection_1 = __importDefault(require("../../data/connection"));
const PasswordReset_1 = __importDefault(require("../../entities/PasswordReset"));
const Model_1 = __importDefault(require("./Model"));
const Responses_1 = require("./Responses");
require("./erros");
class ResetService {
    constructor() {
        this.model = new Model_1.default(connection_1.default.getInstance());
    }
    sendLinkReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, ServiceAll_1.isValidEmail)(email))
                throw new Error("PE-EMIN");
            const user = yield this.model.getIdByEmail(email);
            const passwordReset = new PasswordReset_1.default(user.id, "open", user.name, user.email);
            passwordReset.generateToken();
            yield this.model.closeAllTokens(passwordReset);
            yield this.model.createTokenToReset(passwordReset);
            yield passwordReset.sendEmail();
            return Responses_1.returnResponse["RP_PR_LSS"];
        });
    }
    resetPasswordByToken(password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateToken(token);
            this.isValidPassword(password);
            const userId = yield this.model.getIdFromToken(token);
            const passwordHash = yield (0, ServiceAll_1.hashPasswordByPassword)(password);
            const updated = yield this.model.updatePasswordUserFromId(userId, passwordHash);
            if (updated == 1)
                yield this.model.closeToken(token);
            else
                throw new Error("PE-PWNF");
            return Responses_1.returnResponse["RP_PR_PCS"];
        });
    }
    isValidPassword(password) {
        if (!password || password.trim() === "")
            throw new Error("PE-PWNF");
        if (password.length <= 5)
            throw new Error("PE-PWSE");
    }
    validateToken(token) {
        if (!token || token.trim().length !== 64) {
            throw new Error("PE-TKNF");
        }
    }
}
exports.default = ResetService;
