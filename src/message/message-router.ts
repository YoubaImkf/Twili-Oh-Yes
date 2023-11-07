import { Router, Request, Response, NextFunction } from 'express';
import { MessageController } from './message-controller';

export class MessageRouter {
    router = Router();

    constructor(private messageController: MessageController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.messageController.getMessageFromRedis(req.params.id);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        
        this.router.post('/outgoing', async (req: Request, res: Response, next: NextFunction) => {
            const { body, to } = req.body;
            
            try {
                const result = await this.messageController.outgoingMessage(body, to);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/incoming', async (req: Request, res: Response, next: NextFunction) => {
            const smsSid = req.body.SmsSid;
            const from = req.body.From;
            const body = req.body.Body;
            console.log('smssid:' + smsSid);
            try {
                const result = await this.messageController.incomingMessage(body, from,smsSid);

                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

    }
}
