import { Response, NextFunction } from "express";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import { Controller, Get } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import FollowService from "./Service";
import "./erros";

@Controller("/")
export default class FollowController {
  private service: FollowService;

  constructor() {
    this.service = new FollowService();
  }

  @Get("follow/:username", [Authorization])
  async followUsername(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.follow(req.params.username, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("unfollow/:username", [Authorization])
  async unfollowUsername(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.unfollow(req.params.username, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
