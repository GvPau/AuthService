import bodyParser from "body-parser";
import compress from "compression";
import errorHandler from "errorhandler";
import express, { Request, Response } from "express";
import Router from "express-promise-router";
import helmet from "helmet";
import * as http from "http";
import httpStatus from "http-status";
import { registerRoutes } from "./routes/index";
import cors from "cors";

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;
  private env = process.env.NODE_ENV || "dev";

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: "deny" }));
    this.express.use(compress());
    this.express.use(cors());

    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      if (this.env !== "test") {
        this.httpServer = this.express.listen(this.port, () => {
          console.log(
            `App is running at http://localhost:${this.port} in ${this.express.get(
              "env",
            )} mode`,
          );
          console.log("Press CTRL-C to stop\n");
          resolve();
        });
      }
      resolve();
    });
  }

  getHTTPServer(): http.Server | undefined {
    return this.httpServer;
  }

  getExpress(): express.Express {
    return this.express;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
