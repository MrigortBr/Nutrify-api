import DatabaseConnection from "../../data/connection";
import { AuthorizationNutriModel } from "./Model";

export class AuthorizationNutriService {
  private model: AuthorizationNutriModel;

  constructor() {
    this.model = new AuthorizationNutriModel(DatabaseConnection.getInstance());
  }

  async getIdNutri(userId: number) {
    return await this.model.findById(userId);
  }
}
