import DatabaseConnection from "../../data/connection";
import GeralService from "../_Geral/Service";
import MarkedModel from "./Model";
import { MarkedResponse, returnResponse } from "./Responses";

export default class MarkedService {
  private model: MarkedModel;
  private Geral: GeralService;

  constructor() {
    this.model = new MarkedModel(DatabaseConnection.getInstance());
    this.Geral = new GeralService();
  }

  async getMarkedPosts(username: string, userid: number): Promise<MarkedResponse> {
    await this.Geral.validateUserName(username);

    const profileId = await this.Geral.getIdByUsername(username);

    const visibility = await this.Geral.getVisibilityForProfile(profileId[0], userid);

    const r = await this.model.getMarkedPosts(profileId[0], userid, visibility);
    const response = returnResponse["FC_PR_PML"];
    response.picture = r;
    return response;
  }
}
