import { Response, NextFunction } from "express";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import { Controller, Get } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import BaseService from "./Service";
import "./erros";

//@Controller("///////////")
export default class BaseController {
  private service: BaseService;

  constructor() {
    this.service = new BaseService();
  }

  //@Get("unfollow/:username", [Authorization])
  async BaseRoute(req: RequestAuthorized, res: Response, next: NextFunction) {}
}
