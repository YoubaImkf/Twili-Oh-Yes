import { Router } from "express";
import { MessageInterface } from "../../Twili-Oh-Yes.Core/Interfaces/MessageInterface";
import { MessageRouter } from "../Routers/MessageRouter";
import { MessageController } from "../Controllers/MessageController";

export class ExpressRouter {
  router = Router();

  private messageController!: MessageController;
  private messageRouter!: MessageRouter;

  constructor(private messageInterface: MessageInterface) {
    this.configureControllers();
    this.configureRouters();
    this.configureRoutes();
  }

  private configureControllers(): void {
    this.messageController = new MessageController(this.messageInterface);
  }

  private configureRouters(): void {
    this.messageRouter = new MessageRouter(this.messageController);
  }

  private configureRoutes(): void {
    this.router.use("/message", this.messageRouter.router);
  }
}
