import { Server } from "./Server";
import { Express } from "express";
import { Server as HTTPServer } from "http";

export class App {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.PORT || "5001";
    this.server = new Server(port);
    return this.server.listen();
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }

  get httpServer(): HTTPServer | undefined {
    return this.server?.getHTTPServer();
  }

  get express(): Express | undefined {
    return this.server?.getExpress();
  }
}
