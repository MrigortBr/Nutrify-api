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
exports.EmailModule = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailModule {
    constructor(emailToSend, html, subject, changeItens) {
        this.emailToSend = emailToSend;
        this.html = html;
        this.subject = subject;
        this.changeItens = changeItens;
        this.fileExisists();
        this.transporter = this.createTransponder();
    }
    fileExisists() {
        const templatePath = path_1.default.join(__dirname, `../pages/${this.html}`);
        let emailHtml = fs_1.default.readFileSync(templatePath, "utf-8");
        if (fs_1.default.existsSync(templatePath)) {
            let emailHtml = fs_1.default.readFileSync(templatePath, "utf-8");
            this.html = this.replaceFile(emailHtml);
        }
    }
    replaceFile(emailHtml) {
        const changeItens = this.changeItens;
        const keys = Object.keys(changeItens);
        keys.forEach((key) => {
            if (emailHtml.search(`{{${key}}}`) != -1 && changeItens[key]) {
                emailHtml = emailHtml.replace(`{{${key}}}`, changeItens[key]);
            }
        });
        return emailHtml;
    }
    createTransponder() {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PWD_GMAIL,
            },
        });
        return transporter;
    }
    sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.GMAIL,
                to: this.emailToSend,
                subject: this.subject,
                html: this.html,
            };
            yield this.transporter
                .sendMail(mailOptions)
                .then(() => {
                return true;
            })
                .catch((r) => {
                return false;
            });
        });
    }
}
exports.EmailModule = EmailModule;
