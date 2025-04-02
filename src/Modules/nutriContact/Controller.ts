import { Response, NextFunction } from "express";
import { Controller, Get, Post } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import AuthorizationNutri from "../../middlewares/authorizationNutri/Middleware";
import { RequestAuthorized } from "../../middlewares/authorizationNutri/type";
import { returnResponse } from "./Responses";
import NutriService from "./Service";
import "./erros";

@Controller("/nutri")
export default class BaseController {
  private service: NutriService;

  constructor() {
    this.service = new NutriService();
  }

  @Get("/", [Authorization])
  async GetDates(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const r = await this.service.listNutri();

      const response = returnResponse["NC_PR_NL"];
      response.nutriSimple = r;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/mark", [Authorization])
  async MarkInquiry(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const { nutriId, hourId } = req.body;

      const r = await this.service.MarkInquiry(req.user?.id, nutriId, hourId);

      const response = returnResponse["NC_PR_HM"];
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/services", [Authorization])
  async getMyServices(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const idUser = req.user?.id;

      const last = await this.service.getMyServiceLast(req.user?.id);
      const open = await this.service.getMyServiceOpen(req.user?.id);
      const response = returnResponse["NC_PR_HM"];
      response.servicesLast = last;
      response.servicesOpen = open;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/myServices", [Authorization, AuthorizationNutri])
  async getMyServicesNutri(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const last = await this.service.getMyServiceLastNutri(req.nutriId);
      const open = await this.service.getMyServiceOpenNutri(req.nutriId);
      const response = returnResponse["NC_PR_HM"];
      response.servicesLast = last;
      response.servicesOpen = open;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
