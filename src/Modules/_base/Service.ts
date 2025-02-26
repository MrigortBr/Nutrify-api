import DatabaseConnection from "../../data/connection";
import BaseModel from "./Model";
import { BaseResponse, returnResponse } from "./Responses";

export default class BaseService {
  private model: BaseModel;

  constructor() {
    this.model = new BaseModel(DatabaseConnection.getInstance());
  }

  async BaseService(username: string, userId: number): Promise<BaseResponse> {
    return returnResponse["FC_PR_UUF"];
  }
}
