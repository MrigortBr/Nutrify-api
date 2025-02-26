import { Controller, Post } from "../../base/routerDecorator";
import { Response, Request, NextFunction } from "express";
import { AuthenticateService } from "./Service";

@Controller("/user")
export class AuthenticateController {
  private service: AuthenticateService;

  constructor() {
    this.service = new AuthenticateService();
  }

  @Post("/login")
  async loginRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const response = await this.service.login(email, password);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }

  @Post("/register")
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const response = await this.service.register(name, email, password);
      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
