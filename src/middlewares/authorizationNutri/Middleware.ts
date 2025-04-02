import { Request, Response, NextFunction } from "express";
import { AuthorizationNutriService } from "./Service";
import { RequestAuthorized } from "./type";
import "../errorHandler";

export default async function AuthorizationNutri(req: RequestAuthorized, res: Response, next: NextFunction) {
  try {
    const { username } = req.params;
    const service = new AuthorizationNutriService();

    const user = req.user;

    if (!user) throw new Error("PE-UNKW");

    const idNutri = await service.getIdNutri(user.id);

    if (!idNutri) throw new Error("PE-UNKW");

    req.nutriId = idNutri;

    next();
  } catch (error) {
    next(error);
  }
}
