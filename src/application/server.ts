
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "../config/errorHandler";
import { AppRoutes } from "./routes";
import { MongoDatabase, MysqlDatabase, prisma} from "../data";
import { envs } from "../config/envs";


interface OptionsConnect{
    app: express.Application,
    port: number,
}

MysqlDatabase.connect(prisma);

export class ApplicationBoosTrap {
  private readonly app: express.Application 
  private readonly port: number;

  constructor(options: OptionsConnect) {
    const {port} = options;
    this.port = port;
    this.app = express();;
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