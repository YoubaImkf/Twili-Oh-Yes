import express, { urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import { ExpressRouter } from "./express-router";
import swaggerUi from "swagger-ui-express";

export class ExpressServer {
  private express = express();

  constructor(
    private expressRouter: ExpressRouter,
    private port: string,
    private allowedSubDomain: string[]
  ) {
    this.express.use(express.json());
    this.express.use(urlencoded({ extended: false }));
    this.configureCorsPolicy();
    this.configureRoutes();
    this.configureSwagger();
  }

  bootstrap(): void {
    this.express.listen(this.port, () => {
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
    const swaggerDocument = require("../../swagger-output.json");
    this.express.use(
      "/swagger",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }
}
