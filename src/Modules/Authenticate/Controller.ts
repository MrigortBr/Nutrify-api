import { Controller, Get, Post } from "../../base/routerDecorator";
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
      const { response, id } = await this.service.register(name, email, password);
      res.json(response).status(response.statusCode);
      await new Promise((resolve) =>
        setTimeout(
          async () => {
            try {
              await this.service.verifyUserVerification(id);
            } catch (error) {}
            resolve;
          },
          30 * 60 * 1000,
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  @Post("/register/nutri")
  async registerNutritionist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name, crn, typeCRN } = req.body;
      const { response, id } = await this.service.registerNutri(name, email, password, crn, typeCRN);
      res.json(response).status(response.statusCode);
      await new Promise((resolve) =>
        setTimeout(
          async () => {
            try {
              await this.service.verifyUserVerification(id);
            } catch (error) {
              console.log(error);
            }
            resolve;
          },
          30 * 60 * 1000,
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  @Get("/verify")
  async VerifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers;

      const response = await this.service.verifyEmail(token);

      res.json(response).status(response.statusCode);
    } catch (error) {
      next(error);
    }
  }
}
