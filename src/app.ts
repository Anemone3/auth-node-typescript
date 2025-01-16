import { envs } from "./config/envs";
import express from "express";
import { MongoDatabase, MysqlDatabase, prisma } from "./data";
import morgan from "morgan";
import cors from "cors";
import { AppRoutes } from "./application/routes";
import { errorHandler } from "./config/errorHandler";

MysqlDatabase.connect(prisma);

class ServerBoostrap {
  private readonly app: express.Application = express();
  private readonly port: number = Number(envs.PORT) || 4000;

  constructor() {
    this.middelewares();
    this.listen();
  }

  middelewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use("/api", this.routes());
    this.app.use(errorHandler);
  }

  routes(): express.Router {
    return AppRoutes.routes;
  }

  listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`Server on port ${this.port}`);
    });
  }

  connectionMongo(): void {
    MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  }


}

new ServerBoostrap();

