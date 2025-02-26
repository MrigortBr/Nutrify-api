import { Controller, Post, Get, Delete, Put } from "../../base/routerDecorator";
import { NextFunction, Request, Response } from "express";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import Authorization from "../../middlewares/authorization/Middleware";
import PostService from "./service";
import { PublishData } from "./type";
import { updatePost } from "../../entities/Post";

@Controller("/post")
export default class PublishController {
  private service: PostService;

  constructor() {
    this.service = new PostService();
  }

  @Post("/", [Authorization])
  async publish(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const data = req.body as PublishData;
      const response = await this.service.publish(data, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/:id", [Authorization])
  async getById(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getById(req.params.id, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:id", [Authorization])
  async removeById(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.removePost(req.params.id, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Put("/:id", [Authorization])
  async updatePost(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const data: updatePost = req.body.data;

      const response = await this.service.updatePost(data, req.params.id, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/like/:id", [Authorization])
  async likeOrUnlikePost(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.likeOrUnlikePost(req.params.id, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Get("/s/:id", [Authorization])
  async listSimplePost(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.simplePost(req.params.id, req.user?.id || 0);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
