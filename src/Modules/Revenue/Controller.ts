import { Response, NextFunction } from "express";
import { RequestAuthorized } from "../../middlewares/authorizationNutri/type";
import { Controller, Delete, Get, Post, Put } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import RevenueService from "./Service";
import "./erros";
import AuthorizationNutri from "../../middlewares/authorizationNutri/Middleware";
import { Revenue, RevenuePlan } from "./entity";

@Controller("/revenue")
export default class RevenueController {
  private service: RevenueService;

  constructor() {
    this.service = new RevenueService();
  }

  @Get("/", [Authorization, AuthorizationNutri])
  async GetRevenues(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const nutriId = req.nutriId;
      const result = await this.service.getRevenues(nutriId);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/user/:id/:date", [Authorization, AuthorizationNutri])
  async GetRevenuesForClient(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const nutriId = req.nutriId;
      const { id, date } = req.params;
      const result = await this.service.getRevenuesForClient(nutriId, id, date);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/", [Authorization, AuthorizationNutri])
  async createRevenue(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const nutriId = req.nutriId;
      const data: Revenue = req.body.revenue;
      const result = await this.service.createRevenue(nutriId, data);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/user/:id", [Authorization, AuthorizationNutri])
  async createRevenueUser(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const nutriId = req.nutriId;
      const data: RevenuePlan[] = req.body.revenue;
      const result = await this.service.createRevenueUser(nutriId, data, id);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/", [Authorization, AuthorizationNutri])
  async updateRevenue(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const nutriId = req.nutriId;
      const data: Revenue = req.body.revenue;
      const result = await this.service.updateRevenue(nutriId, data);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:id", [Authorization, AuthorizationNutri])
  async deleteRevenue(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const nutriId = req.nutriId;
      const { id } = req.params;
      const result = await this.service.deleteRevenue(nutriId, id);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
