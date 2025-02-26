import bcrypt from "bcryptjs";
import { hashPasswordByPassword } from "../base/ServiceAll";
import { EmailModule } from "../base/emailModule";

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

class RegisterUser implements IRegisterUser {
  name: string;
  email: string;
  password: string;
  username: string;

  private constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = `${name.replace(/\s+/g, "")}${email.charAt(2)}`.slice(0, 15);
  }

  static async create(tempUser: IRegisterUser): Promise<RegisterUser> {
    this.validateNewIfNotNull(tempUser);
    await this.hashPassword(tempUser);
    return new RegisterUser(tempUser.name, tempUser.email, tempUser.password);
  }

  private static async hashPassword(tempUser: IRegisterUser) {
    tempUser.password = await hashPasswordByPassword(tempUser.password);
  }

  private static validateNewIfNotNull(tempUser: IRegisterUser): void {
    if (!tempUser) {
      throw new Error("PE-IFLR");
    }

    const isNameValid = tempUser.name !== null && tempUser.name !== undefined && tempUser.name.trim() !== "";
    const isEmailValid = tempUser.email !== null && tempUser.email !== undefined && tempUser.email.trim() !== "";
    const isPasswordValid = tempUser.password !== null && tempUser.password !== undefined && tempUser.password.trim() !== "";

    if (!isNameValid && !isEmailValid && !isPasswordValid) {
      throw new Error("PE-IFLR");
    }

    if (!isNameValid) throw new Error("PE-IFLR-NA");
    if (!isEmailValid) throw new Error("PE-IFLR-EM");
    if (!isPasswordValid) throw new Error("PE-IFLR-PW");
  }

  async sayWelcome() {
    if (this.email != undefined) {
      new EmailModule(this.email, "welcome.html", "Bem vindo ao nutrify", {
        name: this.name,
      }).sendEmail();
    }
  }
}

export { RegisterUser, IRegisterUser };
