import { hashPasswordByPassword, isValidEmail } from "../../base/ServiceAll";
import { EmailModule } from "../../base/emailModule";
import { ReturnResponse } from "../../base/responsesData";
import DatabaseConnection from "../../data/connection";
import PasswordReset from "../../entities/PasswordReset";
import ResetModel from "./Model";
import { ResponseReset, returnResponse } from "./Responses";
import "./erros";

export default class ResetService {
  private model: ResetModel;

  constructor() {
    this.model = new ResetModel(DatabaseConnection.getInstance());
  }

  async sendLinkReset(email: string): Promise<ResponseReset> {
    if (!isValidEmail(email)) throw new Error("PE-EMIN");

    const user = await this.model.getIdByEmail(email);

    const passwordReset = new PasswordReset(user.id, "open", user.name, user.email);
    passwordReset.generateToken();

    await this.model.closeAllTokens(passwordReset);

    await this.model.createTokenToReset(passwordReset);

    await passwordReset.sendEmail();

    return returnResponse["RP_PR_LSS"];
  }

  async resetPasswordByToken(password: string, token: string): Promise<ResponseReset> {
    this.validateToken(token);
    this.isValidPassword(password);

    const userId = await this.model.getIdFromToken(token);

    const passwordHash = await hashPasswordByPassword(password);

    const updated = await this.model.updatePasswordUserFromId(userId, passwordHash);

    if (updated == 1) await this.model.closeToken(token);
    else throw new Error("PE-PWNF");

    return returnResponse["RP_PR_PCS"];
  }

  isValidPassword(password: string) {
    if (!password || password.trim() === "") throw new Error("PE-PWNF");
    if (password.length <= 5) throw new Error("PE-PWSE");
  }

  validateToken(token: string) {
    if (!token || token.trim().length !== 64) {
      throw new Error("PE-TKNF");
    }
  }
}
