import express, { urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import { ExpressRouter } from "./ExpressRouter";
import swaggerUi from "swagger-ui-express";
import http from "http";
import { Server, Socket } from "socket.io";

export class ExpressServer {
  private express = express();
  private httpServer: http.Server;
  private io: Server;

  constructor(
    private expressRouter: ExpressRouter,
    private port: string,
    private allowedSubDomain: string[]
  ) {
    this.httpServer = new http.Server(this.express);
    
    this.io = new Server(
      this.httpServer, {
      cors: {
        origin: this.allowedSubDomain,
      }
    });

    this.express.use(express.json());
    this.express.use(urlencoded({ extended: false }));
    this.configureCorsPolicy();
    this.configureRoutes();
    this.configureSwagger();
    this.configureWebSocket();
  }

  bootstrap(): void {
    this.httpServer.listen(this.port, () => {
      console.log(`> Listening on port ${this.port}`);
    });
  }

  private configureRoutes() {
    this.express.use("/api", this.expressRouter.router);
  }

  private configureCorsPolicy(): void {
    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        const isOriginAllowed =
          !origin || this.allowedSubDomain.includes(origin);
        if (isOriginAllowed) {
          callback(null, true);
        } else {
          callback(new Error("CORS: Request origin is not allowed"));
        }
      },
    };

    this.express.use(cors(corsOptions));
  }

  private configureSwagger(): void {
    const swaggerDocument = require("../../../swagger-output.json");
    this.express.use(
      "/swagger",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  private configureWebSocket(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("A client has just connected");

      socket.on("disconnect", () => {
        console.log("A client has disconnected");
      });

    });
  }

}
