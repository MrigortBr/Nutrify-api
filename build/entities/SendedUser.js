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
exports.SendedUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ServiceAll_1 = require("../base/ServiceAll");
class SendedUser {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.validateNewIfNotNull();
    }
    validatePassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordIsValid = yield bcryptjs_1.default.compare(this.password, user.password);
            if (passwordIsValid) {
                this.id = user.id;
                this.generateJWT();
            }
            else {
                throw new Error("PE-IPLL-PW");
            }
        });
    }
    validateNewIfNotNull() {
        const isEmailValid = this.email !== null && this.email !== undefined && this.email.trim() !== "";
        const isPasswordValid = this.password !== null && this.password !== undefined && this.password.trim() !== "";
        if (!isEmailValid && !isPasswordValid) {
            throw new Error("PE-IFLL");
        }
        if (!isEmailValid)
            throw new Error("PE-IFLL-EM");
        if (!isPasswordValid)
            throw new Error("PE-IFLL-PW");
    }
    generateJWT() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                this.jwtKey = yield (0, ServiceAll_1.generateKeyJWT)(this.id);
        });
    }
}
exports.SendedUser = SendedUser;
