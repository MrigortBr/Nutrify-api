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
exports.RegisterUser = void 0;
const ServiceAll_1 = require("../base/ServiceAll");
const emailModule_1 = require("../base/emailModule");
class RegisterUser {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.username = `${name.replace(/\s+/g, "")}${email.charAt(2)}`.slice(0, 15);
    }
    static create(tempUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateNewIfNotNull(tempUser);
            yield this.hashPassword(tempUser);
            return new RegisterUser(tempUser.name, tempUser.email, tempUser.password);
        });
    }
    static hashPassword(tempUser) {
        return __awaiter(this, void 0, void 0, function* () {
            tempUser.password = yield (0, ServiceAll_1.hashPasswordByPassword)(tempUser.password);
        });
    }
    static validateNewIfNotNull(tempUser) {
        if (!tempUser) {
            throw new Error("PE-IFLR");
        }
        const isNameValid = tempUser.name !== null && tempUser.name !== undefined && tempUser.name.trim() !== "";
        const isEmailValid = tempUser.email !== null && tempUser.email !== undefined && tempUser.email.trim() !== "";
        const isPasswordValid = tempUser.password !== null && tempUser.password !== undefined && tempUser.password.trim() !== "";
        if (!isNameValid && !isEmailValid && !isPasswordValid) {
            throw new Error("PE-IFLR");
        }
        if (!isNameValid)
            throw new Error("PE-IFLR-NA");
        if (!isEmailValid)
            throw new Error("PE-IFLR-EM");
        if (!isPasswordValid)
            throw new Error("PE-IFLR-PW");
    }
    sayWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.email != undefined) {
                new emailModule_1.EmailModule(this.email, "welcome.html", "Bem vindo ao nutrify", {
                    name: this.name,
                }).sendEmail();
            }
        });
    }
}
exports.RegisterUser = RegisterUser;
