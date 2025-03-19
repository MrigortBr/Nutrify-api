"use strict";
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
exports.MySocket = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
require("./base/routerDecorator");
const routerDecorator_1 = require("./base/routerDecorator");
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const http_1 = __importDefault(require("http"));
const index_1 = require("./socket/index");
dotenv_1.default.config();
class SERVER {
    constructor() {
        this.url = process.env.URL || "127.0.0.1";
        this.port = process.env.PORT || "2000";
        this.app = (0, express_1.default)();
        this.loadConfig();
        this.loadRoutesAndMiddlewares();
        this.server = http_1.default.createServer(this.app);
        exports.MySocket = new index_1.Socket(this.server);
        this.listenServer();
    }
    loadConfig() {
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.use((0, cors_1.default)());
        this.app.use((req, res, next) => {
            next();
        });
    }
    loadRoutesAndMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(yield (0, routerDecorator_1.RegisterRoutes)());
            this.app.use(errorHandler_1.errorHandler);
        });
    }
    listenServer() {
        this.server.listen(this.port, () => {
            console.log(`Servidor iniciado ${this.url}:${this.port}`);
        });
    }
}
new SERVER();
