import { Response, NextFunction } from "express";
import { RequestAuthorized } from "../../middlewares/authorizationNutri/type";
import { Controller, Delete, Get, Post, Put } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import "./erros";
import NutriHourService from "./Service";
import AuthorizationNutri from "../../middlewares/authorizationNutri/Middleware";
import { returnResponse } from "./Responses";
import { NutriHour } from "./Entity";

@Controller("/hours")
export default class NutriHourController {
  private service: NutriHourService;

  constructor() {
    this.service = new NutriHourService();
  }

  @Get("/:date", [Authorization, AuthorizationNutri])
  async GetDates(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const { date } = req.params;
      const nutriId = req.nutriId;
      const r = await this.service.getFullHoursByTime(date, nutriId);
      const response = returnResponse["NH_PR_HR"];
      response.hours = r;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/:date/:id/", [Authorization])
  async GetDateForNutriId(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const { date, id } = req.params;
      const r = await this.service.getFullHoursByTimeAndID(date, id);
      const response = returnResponse["NH_PR_HR"];
      response.hours = r;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/", [Authorization, AuthorizationNutri])
  async UpdateDate(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const hour: NutriHour = req.body.hours;
      const nutriId = req.nutriId;
      await this.service.updateHoursById(nutriId, hour);
      const response = returnResponse["NH_PR_HU"];
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/", [Authorization, AuthorizationNutri])
  async CreateDate(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const nutriId = req.nutriId;
      const hour: NutriHour = req.body.hours;
      const id = await this.service.createHours(nutriId, hour);
      const response = returnResponse["NH_PR_HU"];
      response.id = id;
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:id", [Authorization, AuthorizationNutri])
  async deleteHour(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const nutriId = req.nutriId;
      const { id } = req.params;
      await this.service.deleteHours(nutriId, id);
      const response = returnResponse["NH_PR_HD"];
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:id", [Authorization, AuthorizationNutri])
  async getRevenuesNutri(req: RequestAuthorized, res: Response, next: NextFunction) {}
}
