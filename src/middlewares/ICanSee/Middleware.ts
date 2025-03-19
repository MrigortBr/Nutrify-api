import { Request, Response, NextFunction } from "express";
import { AuthorizationService } from "./Service";
import "../errorHandler";
import { RequestAuthorized } from "./type";

export default async function ICanSeePlan(req: RequestAuthorized, res: Response, next: NextFunction) {
  try {
    const { username } = req.params;
    const service = new AuthorizationService();

    const user = req.user;

    if (!user) throw new Error("PE-UNKW");

    const r = await service.ICanSeePlan(user.id, username);

    if (!r.iCanSeePlan) throw new Error("CS-NCST");

    req.ican = r;

    next();
  } catch (error) {
    next(error);
  }
}
