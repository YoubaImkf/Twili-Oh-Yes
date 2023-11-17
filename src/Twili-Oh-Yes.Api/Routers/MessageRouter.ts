import { Router, Request, Response, NextFunction } from "express";
import { MessageController } from "../Controllers/MessageController";
import { NotFound } from "http-errors";
import { Message } from "../../Twili-Oh-Yes.Core/Entities/Message";

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
                const key = Number(req.params.key);
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
                const key = Number(req.params.key);
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

        this.router.put("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const updatedMessage = new Message(
                    req.body.Id,
                    req.body.SmsSid,
                    req.body.From,
                    req.body.To,
                    req.body.Body,
                    new Date(),
                    req.body.Direction
                );

                const result = await this.messageController.updateAsync(updatedMessage);
                res.status(200).send(result);

            } catch (error: unknown) {
                if (error instanceof NotFound){
                    res.status(404).send();
                } else {
                    res.status(500).json({ error: "Internal server error"});
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
