import { Router, Request, Response, NextFunction } from "express";
import { MessageController } from "./MessageController";
import { NotFound } from "http-errors";

export class MessageRouter {
    router = Router();

    constructor(private messageController: MessageController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.messageController.getAllAsync();
                res.status(200).json(result);
            } catch (error: unknown) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        this.router.get("/:key", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const key = req.params.key;
                const result = await this.messageController.getAsync(key);  
                res.status(200).json(result);
  
            } catch (error: unknown) {
                if (error instanceof NotFound) {
                  res.status(404).send();
                } else {
                  res.status(500).json({ error: "Internal Server Error" });
                }
              }
        });

        this.router.delete("/:key", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const key = req.params.key;
                await this.messageController.deleteAsync(key);
                res.status(204).send();

              } catch (error: unknown) {
                if (error instanceof NotFound) {
                  res.status(404).send();
                } else {
                  res.status(500).json({ error: "Internal Server Error" });
                }
              }
        });

        this.router.post("/outgoing", async (req: Request, res: Response, next: NextFunction) => {
            const { body, to } = req.body;

            try {
                const result = await this.messageController.outgoing(body, to);
                res.status(201).json(result);
            } catch (error: unknown) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        this.router.post("/incoming", async (req: Request, res: Response, next: NextFunction) => {
            const smsSid = req.body.SmsSid;
            try {
                const result = await this.messageController.incoming(smsSid);
                res.status(200).json(result);
            } catch (error: unknown) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
