import { Router } from 'express';
import { MessageController } from './messageController';

export class MessageRouter {
    router = Router();

    constructor(private messageController: MessageController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.messageController.GetById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {  
                next(error);
            }
        });

        this.router.post('/add', (req, res, next) => { 
            try {
                const newmessage = req.body;
                console.log(req.body);

                const result = this.messageController.Add(newmessage);
                res.status(200).json(result);
            } catch ( error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', (req, res, next) => {
            try {
                const result = this.messageController.Delete(parseInt(req.params.id));
                res.status(204).json(result);
            } catch ( error: unknown) {
                next(error);
            }
        });

        this.router.put('/:id', (req, res, next) => {
            try {
                const message = req.body;
                message.id = parseInt(req.params.id);
                const result = this.messageController.Update(message);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        
    }
}