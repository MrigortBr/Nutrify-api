import { Request, Response, NextFunction } from "express";

export type Controllers = {
  name: string;
  class: any;
  routes: Routes[];
};

export type Methods = "get" | "post" | "delete" | "put";

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;
export type MiddlewareError = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export type Routes = {
  method: Methods;
  routeFunctionName: string;
  path: string;
  middlewares: any[];
};

export type Table = {
  method: Methods;
  functionName: string;
  classParent: string;
  fullPath: string;
  middlewares: any[];
  middlewareController: any[];
};
