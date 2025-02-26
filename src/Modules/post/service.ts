import DatabaseConnection from "../../data/connection";
import PostModel from "./model";
import { responsePost, returnResponse } from "./Responses";
import { PublishData, PublishDataToSend } from "./type";
import "./erros";
import { updatePost } from "../../entities/Post";

export default class PostService {
  private model: PostModel;

  constructor() {
    this.model = new PostModel(DatabaseConnection.getInstance());
  }

  async publish(data: PublishData, idUser: number): Promise<responsePost> {
    if (data.markers.length > 0) {
      const res = await this.model.getUserByUsername(data.markers);
      data.idMarkers = res;
    }
    await this.model.insertPostAndMarked(data, idUser);
    return returnResponse["PC_PR_PCS"];
  }

  async getById(postId: string, userId: number): Promise<responsePost> {
    if (!postId) throw new Error("PC-E-PNE");

    const post = await this.model.getById(postId, userId);
    const response = returnResponse["PC_PR_PLS"];
    response.post = post;
    return response;
  }

  async removePost(postId: string, userId: number): Promise<responsePost> {
    if (!postId) throw new Error("PC-E-PNE");

    const post = await this.model.remove(postId, userId);
    const response = returnResponse["PC_PR_PDS"];

    return response;
  }

  async updatePost(data: updatePost, postId: string, userId: number): Promise<responsePost> {
    const usersId = (await this.model.getUserByUsername(data.userMark)).map((e) => e.id);

    await this.model.update(data, postId, userId, usersId);

    const response = returnResponse["PC_PR_PUS"];
    return response;
  }

  async likeOrUnlikePost(postId: string, userId: number): Promise<responsePost> {
    if (!postId) throw new Error("PC-E-PNE");

    await this.model.likeOrUnlikePost(postId, userId);

    const response = returnResponse["PC_PR_PLI"];
    return response;
  }

  async simplePost(postId: string, userId: number): Promise<responsePost> {
    if (!postId) throw new Error("PC-E-PNE");

    const r = await this.model.simplePost(postId, userId);
    const response = returnResponse["PC_PR_PLS"];
    response.simplePost = r;
    return response;
  }
}
