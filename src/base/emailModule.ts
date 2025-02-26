import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type changeHtml = {
  [key: string]: string | undefined;
};

export class EmailModule {
  emailToSend: string;
  html: string;
  subject: string;
  changeItens: changeHtml;
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

  constructor(emailToSend: string, html: string, subject: string, changeItens: changeHtml) {
    this.emailToSend = emailToSend;
    this.html = html;
    this.subject = subject;
    this.changeItens = changeItens;
    this.fileExisists();
    this.transporter = this.createTransponder();
  }

  private fileExisists() {
    const templatePath = path.join(__dirname, `../pages/${this.html}`);
    let emailHtml = fs.readFileSync(templatePath, "utf-8");

    if (fs.existsSync(templatePath)) {
      let emailHtml = fs.readFileSync(templatePath, "utf-8");
      this.html = this.replaceFile(emailHtml);
    }
  }

  private replaceFile(emailHtml: string): string {
    const changeItens = this.changeItens;

    const keys = Object.keys(changeItens);

    keys.forEach((key) => {
      if (emailHtml.search(`{{${key}}}`) != -1 && changeItens[key]) {
        emailHtml = emailHtml.replace(`{{${key}}}`, changeItens[key]);
      }
    });

    return emailHtml;
  }

  private createTransponder() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PWD_GMAIL,
      },
    });

    return transporter;
  }

  async sendEmail() {
    const mailOptions = {
      from: process.env.GMAIL,
      to: this.emailToSend,
      subject: this.subject,
      html: this.html,
    };

    await this.transporter
      .sendMail(mailOptions)
      .then(() => {
        return true;
      })
      .catch((r) => {
        return false;
      });
  }
}
