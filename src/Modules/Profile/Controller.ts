import { Controller, Post, Get, Put } from "../../base/routerDecorator";
import { NextFunction, Request, Response } from "express";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import Authorization from "../../middlewares/authorization/Middleware";
import PostService from "./Service";
import ProfileService from "./Service";
import ProfileUser from "../../entities/ProfileUser";

@Controller("/profile")
export default class ProfileController {
  private service: ProfileService;

  constructor() {
    this.service = new ProfileService();
  }

  @Get("/s/", [Authorization])
  async getSimpleProfile(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getSimpleProfile(req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/:username", [Authorization])
  async getProfile(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getProfile(req.params.username, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/", [Authorization])
  async updateProfile(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const profile: ProfileUser = req.body;
      const response = await this.service.updateProfile(profile, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/config/privacy", [Authorization])
  async getConfigUser(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getConfigUser(req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/config", [Authorization])
  async updateConfigUser(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.updateConfigUser(req.user?.id || 0, req.body.data);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
