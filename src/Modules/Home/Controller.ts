import { NextFunction, Response } from "express";
import { Controller, Get } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import HomeService from "./service";
import GeralService from "../_Geral/Service";

@Controller("/home")
export default class HomeController {
  private service: HomeService;

  constructor() {
    this.service = new HomeService();
  }

  @Get("/foryou", [Authorization])
  async getHome(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getHome(req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/fallow", [Authorization])
  async getFallow(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getFallow(req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
