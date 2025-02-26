import { Response, Request } from "express";
import aboutData from "./typeAbout";
import { Controller, Get } from "../../base/routerDecorator";
import { EmailModule } from "../../base/emailModule";
import Authorization from "../../middlewares/authorization/Middleware";
import { RequestAuthorized } from "../../middlewares/authorization/type";

@Controller("/")
export class AboutController {
  @Get("/", [Authorization])
  about(req: RequestAuthorized, res: Response) {
    res.status(200);
    res.json(aboutData);
  }
}
