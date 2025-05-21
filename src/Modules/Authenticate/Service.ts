import { decodeKeyVerify, generateKeyJWT, generateKeyVerify } from "../../base/ServiceAll";
import { ReturnResponse } from "../../base/responsesData";
import DatabaseConnection from "../../data/connection";
import { RegisterUser } from "../../entities/RegisterUser";
import { SendedUser } from "../../entities/SendedUser";
import { CRN } from "../../entities/users";
import { UserModel } from "./Model";
import { responseLogin, returnResponse } from "./Responses";
import "./erros";

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

    const idNutri = await this.model.userIsNutri(user.id);

    if (sendedUser.jwtKey == undefined) throw new Error("PE-NPGJ");
    const response = returnResponse["AC_PR_LASU"];
    response.jwt = sendedUser.jwtKey;
    response.type = idNutri != undefined ? "nutri" : "user";

    return response;
  }

  async register(name: string, email: string, password: string): Promise<{ response: responseLogin } & { id: number }> {
    const registerUser: RegisterUser = await RegisterUser.create({
      email: email,
      name: name,
      password: password,
    });
    const idUser = await this.model.registerUser(registerUser);
    const jwtKey = await generateKeyVerify(idUser.id, name, email, "user");
    registerUser.sayVerify(jwtKey);
    const response = returnResponse["AC_PR_RASU"];
    response.jwt = jwtKey;
    return { response, id: idUser.id };
  }

  async verifyUserVerification(id: number) {
    const r = await this.model.userVerifyEmail(id);
    if (!r.checked) {
      this.model.deleteUser(id);
    }
  }

  async registerNutri(name: string, email: string, password: string, crn: CRN, typeCRN: string): Promise<{ response: responseLogin } & { id: number }>  {
    const registerUser: RegisterUser = await RegisterUser.create({
      email: email,
      name: name,
      password: password,
    });
    const idUser = await this.model.registerNutri(registerUser, crn, typeCRN);

    const jwtKey = await generateKeyVerify(idUser.id, name, email, "nutri");
    registerUser.sayVerify(jwtKey);
    const response = returnResponse["AC_PR_RASU"];
    response.jwt = jwtKey;
    return {response: response, id: idUser.id};
  }

  async verifyEmail(token: string | string[] | undefined) {
    if (typeof token != "string") {
      throw new Error("PE-CIVL-PW");
    }

    const data = await decodeKeyVerify(token);

    await this.model.verifyEmail(data.id, data.name, data.email);

    const userObject: RegisterUser = await RegisterUser.create({
      email: data.email,
      name: data.name,
      password: "pwd",
    });


    const jwt = await generateKeyJWT(data.id)
    
    userObject.sayWelcome();

    const response = returnResponse["AC_PR_EA"];
    response.jwt = jwt;
    response.type = data.type;

    return response;
  }
}
