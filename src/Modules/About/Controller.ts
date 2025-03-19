import { Response } from "express";
import aboutData from "./typeAbout";
import { Controller, Get } from "../../base/routerDecorator";
import Authorization from "../../middlewares/authorization/Middleware";
import { RequestAuthorized } from "../../middlewares/authorization/type";
import SocketModel from "../../socket/model";

@Controller("/")
export class AboutController {
  public model: SocketModel = new SocketModel();

  @Get("/")
  async about(req: RequestAuthorized, res: Response) {
    const r = await this.model.getMyNewChat(15, 57);
    res.status(200);
    //res.json(aboutData);
    res.json(r);
  }
}
