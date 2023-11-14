import { ExpressServer } from "./ExpressServer";
import { ExpressRouter } from "./ExpressRouter";
import { MessageInterface } from "../../Twili-Oh-Yes.Core/Interfaces/MessageInterface";
import { MessageService } from "../../Twili-Oh-Yes.Core/Services/MessageService";
import * as dotenv from "dotenv";

export class ExpressApplication {
  private expressRouter!: ExpressRouter;
  private server!: ExpressServer;
  private messageInterface!: MessageInterface;
  private port!: string;
  private allowedSubDomain!: string[];

  constructor() {
    this.configureApplication();
  }

  bootstrap(): void {
    this.server.bootstrap();
  }

  private configureApplication(): void {
    this.configureEnvironment();
    this.configureServerPort();
    this.configureServerAllowedSubDomain();
    this.configureServices();
    this.configureExpressRouter();
    this.configureServer();   
  }

  private configureEnvironment(): void {
    dotenv.config({
      path: ".env",
    });
  }

  private configureServerPort(): void {
    this.port = this.getPort();
  }

  private configureServerAllowedSubDomain(): void {
    this.allowedSubDomain = this.getAllowedSubDomain();
  }

  private configureServices(): void {
    this.messageInterface = new MessageService();
  }

  private configureExpressRouter(): void {
    this.expressRouter = new ExpressRouter(this.messageInterface);
  }

  private configureServer(): void {
    this.server = new ExpressServer(
      this.expressRouter,
      this.port,
      this.allowedSubDomain
    );
  }


  //#region GET .env
  private getPort(): string {
    const port = process.env.PORT;

    if (!port) {
      throw new Error("No port was found in env file.");
    }

    return port;
  }

  private getAllowedSubDomain(): string[] {
    const allowedSubDomain = process.env.ALLOWED_SUB_DOMAIN;

    if (!allowedSubDomain) {
      throw new Error("No allowed sub domain was found in env file.");
    }

    return allowedSubDomain.split(",");
  }
  //#endregion
}
