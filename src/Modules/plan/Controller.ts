import { Response, NextFunction } from "express";
import { Controller, Delete, Get, Post, Put } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import { RequestAuthorized } from "../../middlewares/ICanSee/type";
import ICanSeePlan from "../../middlewares/ICanSee/Middleware";
import { planFood } from "./types";
import PlanService from "./Service";

@Controller("/plan")
export default class PlanController {
  private service: PlanService;

  constructor() {
    this.service = new PlanService();
  }

  @Get("/:username", [Authorization, ICanSeePlan])
  async getPlan(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      if (!req.ican) throw new Error("PE-UNKW");

      const { date } = req.query;

      let dateVar: string = "";

      if (typeof date == "string" && date != undefined) {
        dateVar = date;
      } else {
        dateVar = new Date().toISOString().split("T")[0];
      }

      const response = await this.service.getPlan(req.ican.userid, dateVar);

      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/", [Authorization])
  async addPlan(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const plan: planFood = req.body;
      const user = req.user;

      if (!user) throw new Error("PE-UNKW");

      const response = await this.service.insertPlan(user.id, plan);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/", [Authorization])
  async updatePlan(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const plan: planFood = req.body.plan;
      const user = req.user;

      if (!user) throw new Error("PE-UNKW");
      if (!plan) throw new Error("PE-UNKW");

      const response = await this.service.updatePlan(user.id, plan);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/:id", [Authorization])
  async markedPlan(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const idPlan: number = Number(req.params.id) ?? undefined;
      const { marked } = req.body;

      if (!user) throw new Error("PE-UNKW");
      if (!idPlan) throw new Error("PE-UNKW");
      if (!marked) throw new Error("PE-UNKW");

      const response = await this.service.markerPlan(user.id, idPlan, marked);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:id", [Authorization])
  async deletePlan(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const idPlan: number = Number(req.params.id) ?? undefined;

      if (!user) throw new Error("PE-UNKW");
      if (!idPlan) throw new Error("PE-UNKW");

      const response = await this.service.deletePlan(user.id, idPlan);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
