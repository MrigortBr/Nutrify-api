import dotenv from "dotenv";
import express from "express";
import "./base/routerDecorator";
import { RegisterRoutes } from "./base/routerDecorator";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

class Server {
  private url: string = process.env.URL || "127.0.0.1";
  private port: string = process.env.PORT || "2000";
  private app;

  constructor() {
    this.app = express();
    this.loadConfig();
    this.loadRoutesAndMiddlewares();
    this.listenServer();
  }

  private loadConfig() {
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(
      cors({
        origin: ["https://nutrify-front.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );
    this.app.use((req, res, next) => {
      console.log("Origin da requisição:", req.headers.origin);
      next();
    });
  }

  private async loadRoutesAndMiddlewares() {
    this.app.use(await RegisterRoutes());
    this.app.use(errorHandler);
  }

  private listenServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor iniciado ${this.url}:${this.port}`);
    });
  }
}

new Server();
