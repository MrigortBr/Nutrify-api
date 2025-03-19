import "reflect-metadata";
import { Router } from "express";
import { Controllers, Methods, Middleware, Routes, Table } from "./typeDecorator";
import fs from "fs";
import path from "path";

const controllerRegistry: Controllers[] = [];
const tableLog: Table[] = [];

export const Get = (path: string, middlewares: Middleware[] = []) => route("get", path, middlewares);
export const Post = (path: string, middlewares: Middleware[] = []) => route("post", path, middlewares);
export const Delete = (path: string, middlewares: Middleware[] = []) => route("delete", path, middlewares);
export const Put = (path: string, middlewares: Middleware[] = []) => route("put", path, middlewares);

export function Controller(path: string, middlewares: Middleware[] = []) {
  return function (target: any) {
    Reflect.defineMetadata("path", path, target);
    Reflect.defineMetadata("middlewares", middlewares, target);
  };
}

function route(method: Methods, path: string, middlewares: Middleware[] = []) {
  return function (target: any, key: string) {
    const classConstructor = target.constructor;
    const className = classConstructor.name;

    let controller = controllerRegistry.find((c) => c.name === className);

    const route: Routes = {
      method,
      routeFunctionName: key,
      path,
      middlewares,
    };

    if (controller) {
      controller.routes.push(route);
    } else {
      controllerRegistry.push({
        name: className,
        class: classConstructor,
        routes: [route],
      });
    }
  };
}

export async function RegisterRoutes() {
  const router = Router();
  await loadControllers();

  controllerRegistry.forEach((controller) => {
    const newinstance = new controller.class();
    const instance = controller.class;
    const controllerPath = Reflect.getMetadata("path", instance);
    let controllerMiddleWares: any[] = Reflect.getMetadata("middlewares", instance) || [];

    controller.routes.forEach((route) => {
      const { method, routeFunctionName, middlewares } = route;
      const handler = newinstance[routeFunctionName].bind(newinstance);

      const fullPath = controllerPath + route.path;

      router[method](fullPath, controllerMiddleWares.concat(middlewares), handler);

      tableLog.push({
        method: method,
        functionName: routeFunctionName,
        classParent: instance.name,
        fullPath: fullPath,
        middlewares: middlewares,
        middlewareController: controllerMiddleWares,
      });
    });
  });

  showTable();
  return router;
}

function showTable() {
  if (process.env.STATUS == "DEV" || process.env.SHOWROUTES == "1") {
    const formattedLog = tableLog.map(({ method, functionName, classParent, fullPath, middlewares, middlewareController }) => ({
      Method: method,
      "Route Name": functionName,
      "Controller Name": classParent,
      URL: fullPath,
      "Middlewares Rota": middlewares,
      "Middlewares Controller": middlewareController,
    }));
    console.table(formattedLog);
  }
}

async function loadControllers() {
  const modulesPath = path.join(__dirname, "../Modules");

  // Lê todas as subpastas de Modules
  const modules = fs.readdirSync(modulesPath);
  for (const module of modules) {
    const controllerPath = path.join(modulesPath, module, `Controller${path.extname(__filename)}`);

    if (fs.existsSync(controllerPath)) {
      await import(controllerPath);
      if (process.env.STATUS == "DEV" || process.env.SHOWIMPORTS == "1") console.log(`🔹 Importado: ${controllerPath}`);
    }
  }
}
