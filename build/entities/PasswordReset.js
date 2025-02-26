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
const crypto_1 = __importDefault(require("crypto"));
const emailModule_1 = require("../base/emailModule");
class PasswordReset {
    constructor(user_id, status, name, email) {
        this.user_id = user_id;
        this.status = status || "open";
        if (name)
            this.name = name;
        if (email)
            this.email = email;
    }
    generateToken() {
        const secretKey = process.env.SECRET_KEY || "asdaxawe12wqazcfs"; // 🔐 Use uma chave segura
        const data = `${this.email}:${this.name}:${Date.now()}`;
        this.token = crypto_1.default.createHmac("sha256", secretKey).update(data).digest("hex");
    }
    sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.email != undefined && this.token != undefined) {
                new emailModule_1.EmailModule(this.email, "reset_email.html", "Redefinição de Senha do nutrify", {
                    name: this.name,
                    reset_link: `${process.env.PAGE_RESET_EMAIL}${this.token}`,
                }).sendEmail();
            }
        });
    }
}
exports.default = PasswordReset;
