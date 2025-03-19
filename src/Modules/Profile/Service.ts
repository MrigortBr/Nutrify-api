import { hashPasswordByPassword, isValidEmail } from "../../base/ServiceAll";
import DatabaseConnection from "../../data/connection";
import { updateUserPrivacy } from "../../entities/ConfigEntity";
import ProfileUser from "../../entities/ProfileUser";
import ProfileModel from "./Model";
import { returnResponse, responseProfile } from "./Responses";
import "./errors";

export default class ProfileService {
  private model: ProfileModel;

  constructor() {
    this.model = new ProfileModel(DatabaseConnection.getInstance());
  }

  async getProfile(username: string, idUser: number): Promise<responseProfile> {
    if (!username || !username.trim()) throw new Error("PC-E-NU");

    const profileId = await this.model.findUserByUsername(username);

    const r = await this.model.getProfile(profileId, idUser);

    const response = returnResponse["PC_PR_PFS"];
    response.profile = r;

    return response;
  }

  async getSimpleProfile(idUser: number) {
    const r = await this.model.getSimpleProfile(idUser);

    if (!r) throw new Error("PC-E-ND");

    const response = returnResponse["PC_PR_PFS"];
    response.simpleProfile = r;

    return response;
  }

  async updateProfile(profile: ProfileUser, idUser: number): Promise<responseProfile> {
    if (!profile) throw new Error("PC-E-ND");

    await this.model.updateUser(idUser, profile);

    const response = returnResponse["PC_PR_PUS"];

    return response;
  }

  async getConfigUser(idUser: number): Promise<responseProfile> {
    const privacy = await this.model.getConfigUser(idUser);

    const response = returnResponse["PC_PR_PCS"];
    response.privacy = privacy;

    return response;
  }

  //BUG Crash on error
  async updateConfigUser(idUser: number, data: updateUserPrivacy): Promise<responseProfile> {
    const response = returnResponse["PC_PR_PCU"];

    const newData: updateUserPrivacy = {
      whosendmessage: data.whosendmessage,
      whoseemyplanning: data.whoseemyplanning,
      whoseemyposts: data.whoseemyposts,
    };

    if (data.password) {
      newData.password = await hashPasswordByPassword(data.password);
    }

    if (isValidEmail(data.email)) newData.email = data.email;

    this.model.updateConfigUser(idUser, newData);

    return response;
  }
}
