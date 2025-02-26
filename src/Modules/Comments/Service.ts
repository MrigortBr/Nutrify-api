import { CommentsResponse, returnResponse } from "./Responses";
import DatabaseConnection from "../../data/connection";
import CommentsModel from "./Model";
import GeralService from "../_Geral/Service";

export default class CommentsService {
  private model: CommentsModel;
  private geralService: GeralService;

  constructor() {
    this.model = new CommentsModel(DatabaseConnection.getInstance());
    this.geralService = new GeralService();
  }

  async commentInPost(postId: string, userId: number, comment: string): Promise<CommentsResponse> {
    if (!postId) throw new Error("PC-E-PNE");
    if (!comment) throw new Error("PC-E-CNE");

    const r = await this.model.commentInPost(postId, userId, comment);
    const response = returnResponse["CC_PR_CCS"];
    return response;
  }

  async deleteMyComment(postId: string, idUser: number, commentId: string): Promise<CommentsResponse> {
    await this.model.deleteMyComment(postId, idUser, commentId);
    const response = returnResponse["CC_PR_CDS"];
    return response;
  }

  async getComments(postId: string, page: string, idUser: number, size: string): Promise<CommentsResponse> {
    const visibility = await this.geralService.userCanViewAndCanComment(postId, idUser);
    const data = await this.model.getComments(postId, page, size);
    data.iCanComment = visibility.iCanComment;
    const response = returnResponse["CC_PR_CLS"];
    response.comments = data;
    return response;
  }
}
