import { ExpressServer } from "./express-server";
import { ExpressRouter } from "./express-router";
import { MessageInterface } from "../message/message-interface";
import { MessageService } from "../message/message-service";
import * as dotenv from "dotenv";
import { RedisClientInstance } from "../configuration/redis-config";

export class ExpressApplication {
  private expressRouter!: ExpressRouter;
  private server!: ExpressServer;
  private redisClient!: RedisClientInstance;
  private messageInterface!: MessageInterface;
  private port!: string;
  private allowedSubDomain!: string[];
  private redisPassword!: string;
  private redisHost!: string;
  private redisPort!: number;


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
    this.configureRedisEnvironementVariables();
    this.configureServices();
    this.configureRedis()
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

  private configureRedisEnvironementVariables(): void {
    this.redisPassword = this.getRedisPassword();
    this.redisHost = this.getRedisHost();
    this.redisPort = this.getRedisPort();
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

  private configureRedis(): void {
    this.redisClient = new RedisClientInstance(
      this.redisPassword,
      this.redisHost,
      this.redisPort
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

  private getRedisPassword(): string {
    const password = process.env.REDIS_PASSWORD;

    if (!password) {
      throw new Error("No port was found in env file.");
    }

    return password;
  }

  private getRedisHost(): string {
    const redisHost = process.env.REDIS_HOST;

    if (!redisHost) {
      throw new Error("No port was found in env file.");
    }

    return redisHost;
  }

  private getRedisPort(): number {
    const redisPort = process.env.REDIS_PORT;

    if (!redisPort) {
      throw new Error("No port was found in env file.");
    }

    return parseInt(redisPort);
  }
  //#endregion
}
