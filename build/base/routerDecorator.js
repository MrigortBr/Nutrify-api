"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = exports.Delete = exports.Post = exports.Get = void 0;
exports.Controller = Controller;
exports.RegisterRoutes = RegisterRoutes;
require("reflect-metadata");
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const controllerRegistry = [];
const tableLog = [];
const Get = (path, middlewares = []) => route("get", path, middlewares);
exports.Get = Get;
const Post = (path, middlewares = []) => route("post", path, middlewares);
exports.Post = Post;
const Delete = (path, middlewares = []) => route("delete", path, middlewares);
exports.Delete = Delete;
const Put = (path, middlewares = []) => route("put", path, middlewares);
exports.Put = Put;
function Controller(path, middlewares = []) {
    return function (target) {
        Reflect.defineMetadata("path", path, target);
        Reflect.defineMetadata("middlewares", middlewares, target);
    };
}
function route(method, path, middlewares = []) {
    return function (target, key) {
        const classConstructor = target.constructor;
        const className = classConstructor.name;
        let controller = controllerRegistry.find((c) => c.name === className);
        const route = {
            method,
            routeFunctionName: key,
            path,
            middlewares,
        };
        if (controller) {
            controller.routes.push(route);
        }
        else {
            controllerRegistry.push({
                name: className,
                class: classConstructor,
                routes: [route],
            });
        }
    };
}
function RegisterRoutes() {
    return __awaiter(this, void 0, void 0, function* () {
        const router = (0, express_1.Router)();
        yield loadControllers();
        controllerRegistry.forEach((controller) => {
            const newinstance = new controller.class();
            const instance = controller.class;
            const controllerPath = Reflect.getMetadata("path", instance);
            let controllerMiddleWares = Reflect.getMetadata("middlewares", instance) || [];
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
    });
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
function loadControllers() {
    return __awaiter(this, void 0, void 0, function* () {
        const modulesPath = path_1.default.join(__dirname, "../Modules");
        // Lê todas as subpastas de Modules
        const modules = fs_1.default.readdirSync(modulesPath);
        for (const module of modules) {
            const controllerPath = path_1.default.join(modulesPath, module, "Controller.js");
            if (fs_1.default.existsSync(controllerPath)) {
                yield Promise.resolve(`${controllerPath}`).then(s => __importStar(require(s)));
                if (process.env.STATUS == "DEV" || process.env.SHOWIMPORTS == "1")
                    console.log(`🔹 Importado: ${controllerPath}`);
            }
        }
    });
}
