import DatabaseConnection from "../../data/connection";
import GeralModel from "./Model";
import { GeralResponse, returnResponse } from "./Responses";
import "./erros";
import { iCanInPost } from "./types";

export default class GeralService {
  private model: GeralModel;

  constructor() {
    this.model = new GeralModel(DatabaseConnection.getInstance());
  }

  async validatePostID(postId: number) {
    if (!postId) throw new Error("GC-E-PNE");
  }

  async validateUserName(username: string) {
    if (!username || !username.trim()) throw new Error("GC-E-UNF");
  }

  async getIdByUsername(username: string) {
    await this.validateUserName(username);
    return await this.model.getIdsByUsername([username]);
  }

  async userCanViewAndCanComment(postId: string, userId: number): Promise<iCanInPost> {
    return await this.model.userCanViewAndCanComment(postId, userId);
  }

  async getVisibilityForProfile(profileId: number, userId: number) {
    return this.model.getVisibilityForProfile(profileId, userId);
  }
}
