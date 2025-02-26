import { Response, NextFunction } from "express";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import { Controller, Delete, Get, Post } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import CommentsService from "./Service";
import "./erros";

@Controller("/comment")
export default class CommentsController {
  private service: CommentsService;

  constructor() {
    this.service = new CommentsService();
  }

  @Get("/:idPost", [Authorization])
  async getComments(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const page = Array.isArray(req.query.page) ? undefined : (req.query.page as string | "0");
      const size = Array.isArray(req.query.size) ? undefined : (req.query.size as string | "10");
      const response = await this.service.getComments(req.params.idPost, page || "0", req.user?.id || 0, size || "10");
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:idPost/:idComment", [Authorization])
  async deleteMyComment(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const response = await this.service.deleteMyComment(req.params.idPost, req.user?.id || 0, req.params.idComment);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/:id", [Authorization])
  async commentInPost(req: RequestAuthorized, res: Response, next: NextFunction) {
    try {
      const { comment } = req.body;

      const response = await this.service.commentInPost(req.params.id, req.user?.id || 0, comment);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
