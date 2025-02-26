import DatabaseConnection from "../../data/connection";
import GeralService from "../_Geral/Service";
import { responsePost, returnResponse } from "../post/Responses";
import HomeModel from "./model";

export default class HomeService {
  private model: HomeModel;
  private geralService: GeralService;

  constructor() {
    this.model = new HomeModel(DatabaseConnection.getInstance());
    this.geralService = new GeralService();
  }

  async getHome(userid: number): Promise<responsePost> {
    const r = await this.model.getHome(userid);

    await Promise.all(
      r.map(async (element) => {
        const visibility = await this.geralService.userCanViewAndCanComment(element.id || "", userid);
        element.iCanComment = visibility.iCanComment;
      }),
    );
    const response = returnResponse["PC_PR_PCC"];
    response.simplePost = r;
    return response;
  }

  async getFallow(userid: number): Promise<responsePost> {
    const r = await this.geralService.getIdByUsername("ttt");
    const response = returnResponse["PC_PR_PCC"];
    return response;
  }
}
