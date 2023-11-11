import { Router, Request, Response, NextFunction } from 'express';
import { MessageController } from './MessageController';

export class MessageRouter {
    router = Router();

    constructor(private messageController: MessageController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.messageController.getAllAsync();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/:SmsSid', async (req: Request, res: Response, next: NextFunction) => {
            try {
                let smsSid = req.params.SmsSid
                const result = await this.messageController.getAsync(smsSid);

                if(result != null)
                    res.status(200).json(result);
                else
                    res.status(404).json(`The message with the sid:${smsSid} was not found`)

            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:SmsSid', async (req: Request, res: Response, next: NextFunction) => {
            try {
                let smsSid = req.params.SmsSid
                const result = await this.messageController.deleteAsync(smsSid);

                if(result != null)
                    res.status(200).json(result);
                else
                    res.status(404).json(`The message with the sid:${smsSid} was not found`)

            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/outgoing', async (req: Request, res: Response, next: NextFunction) => {
            const { body, to } = req.body;
            
            try {
                const result = await this.messageController.outgoing(body, to);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/incoming', async (req: Request, res: Response, next: NextFunction) => {
            const smsSid = req.body.SmsSid;

            try {
                const result = await this.messageController.incoming(smsSid);

                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

    }
}
