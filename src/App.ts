import { Server } from "./Server";

export class App {
  server?: Server;
  private env = process.env.NODE_ENV || "dev";

  async start() {
    const port = process.env.PORT || "5001";
    this.server = new Server(port);
    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  get express() {
    return this.server?.getExpress();
  }
}
