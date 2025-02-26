import crypto from "crypto";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { EmailModule } from "../base/emailModule";

export default class PasswordReset {
  id?: number;
  user_id: number;
  token?: string;
  created_at?: Date;
  expires_at?: Date;
  status: "open" | "closed" | "expired";
  name?: string;
  email?: string;

  constructor(user_id: number, status: "open" | "closed" | "expired", name?: string, email?: string) {
    this.user_id = user_id;
    this.status = status || "open";
    if (name) this.name = name;
    if (email) this.email = email;
  }

  generateToken() {
    const secretKey = process.env.SECRET_KEY || "asdaxawe12wqazcfs"; // 🔐 Use uma chave segura
    const data = `${this.email}:${this.name}:${Date.now()}`;

    this.token = crypto.createHmac("sha256", secretKey).update(data).digest("hex");
  }

  async sendEmail() {
    if (this.email != undefined && this.token != undefined) {
      new EmailModule(this.email, "reset_email.html", "Redefinição de Senha do nutrify", {
        name: this.name,
        reset_link: `${process.env.PAGE_RESET_EMAIL}${this.token}`,
      }).sendEmail();
    }
  }
}
