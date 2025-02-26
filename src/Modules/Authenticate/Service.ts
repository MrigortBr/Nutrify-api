import { generateKeyJWT } from "../../base/ServiceAll";
import { ReturnResponse } from "../../base/responsesData";
import DatabaseConnection from "../../data/connection";
import { RegisterUser } from "../../entities/RegisterUser";
import { SendedUser } from "../../entities/SendedUser";
import { UserModel } from "./Model";
import { responseLogin, returnResponse } from "./Responses";
import "./erros";
import jwt from "jsonwebtoken";

export class AuthenticateService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel(DatabaseConnection.getInstance());
  }

  async login(email: string, password: string): Promise<responseLogin> {
    const sendedUser = new SendedUser(email, password);

    const user = await this.model.getUserByEmail(sendedUser.email);

    if (user != null) {
      await sendedUser.validatePassword(user);
    } else {
      throw new Error("PE-IELL-PW");
    }

    sendedUser.generateJWT();

    if (sendedUser.jwtKey == undefined) throw new Error("PE-NPGJ");
    const response = returnResponse["AC_PR_LASU"];
    response.jwt = sendedUser.jwtKey;

    return response;
  }

  async register(name: string, email: string, password: string) {
    const registerUser: RegisterUser = await RegisterUser.create({
      email: email,
      name: name,
      password: password,
    });
    const idUser = await this.model.registerUser(registerUser);
    registerUser.sayWelcome();
    const jwtKey = await generateKeyJWT(idUser.id);
    const response = returnResponse["AC_PR_RASU"];
    response.jwt = jwtKey;
    return response;
  }
}
