import { Response, NextFunction } from "express";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import { Controller, Delete, Get } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import MarkedService from "./Service";
import "./erros";

@Controller("/marked")
export default class MarkedController {
  private service: MarkedService;

  constructor() {
    this.service = new MarkedService();
  }

  @Get("/:username", [Authorization])
  async getMarkedPosts(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getMarkedPosts(req.params.username, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:postId", [Authorization])
  async removeMyMarked(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.removeMyMarked(req.params.postId, req.user?.id);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
