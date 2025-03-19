import dotenv from "dotenv";
import express from "express";
import "./base/routerDecorator";
import { RegisterRoutes } from "./base/routerDecorator";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import http, { Server } from "http";
import { Socket } from "./socket/index";

dotenv.config();

export let MySocket: Socket;

class SERVER {
  private url: string = process.env.URL || "127.0.0.1";
  private port: string = process.env.PORT || "2000";
  private app;
  private server: Server;

  constructor() {
    this.app = express();
    this.loadConfig();
    this.loadRoutesAndMiddlewares();
    this.server = http.createServer(this.app);
    MySocket = new Socket(this.server);
    this.listenServer();
  }

  private loadConfig() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(cors());
    this.app.use((req, res, next) => {
      next();
    });
  }

  private async loadRoutesAndMiddlewares() {
    this.app.use(await RegisterRoutes());
    this.app.use(errorHandler);
  }

  private listenServer() {
    this.server.listen(this.port, () => {
      console.log(`Servidor iniciado ${this.url}:${this.port}`);
    });
  }
}

new SERVER();
