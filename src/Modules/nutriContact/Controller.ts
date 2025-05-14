import { Response, NextFunction } from "express";
import { Controller, Get, Post, Put } from "../../base/routerDecorator";
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
      const { date } = req.query;

      const last = await this.service.getMyServiceLastNutri(req.nutriId, date);
      const open = await this.service.getMyServiceOpenNutri(req.nutriId, date);
      const response = returnResponse["NC_PR_HM"];
      response.servicesLast = last;
      response.servicesOpen = open;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/Configs", [Authorization, AuthorizationNutri])
  async getMyConfigs(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getMyConfigs(req.nutriId, req.user?.id);
      const response = returnResponse["NC_PR_CR"];
      response.acceptClients = data.acceptClients;
      response.price = data.price;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/Configs", [Authorization, AuthorizationNutri])
  async updateMyConfigs(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const { acceptClients, price } = req.body;
      const nutriId = req.nutriId;
      const userId = req.user?.id;
      const data = await this.service.updateMyConfigs(nutriId, userId, price, acceptClients);
      const response = returnResponse["NC_PR_CU"];
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
