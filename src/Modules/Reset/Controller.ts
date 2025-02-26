import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../../base/routerDecorator";
import "./erros";
import { hashPasswordByPassword } from "../../base/ServiceAll";
import ResetService from "./Service";

@Controller("/reset")
export class ResetController {
  private service: ResetService;

  constructor() {
    this.service = new ResetService();
  }

  @Post("/request")
  async sendLinkToResetPWD(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = await this.service.sendLinkReset(email);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/:token")
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;
      const { password } = req.body;
      const result = await this.service.resetPasswordByToken(password, token);
      res.send(result).status(result.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
