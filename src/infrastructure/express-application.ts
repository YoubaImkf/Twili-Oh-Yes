import { ExpressServer } from './express-server';
import { ExpressRouter } from './express-router';
import { MessageInterface } from '../message/messageInterface';
import { MessageService } from '../message/messageService';
import * as dotenv from 'dotenv';

export class ExpressApplication {
    private expressRouter !: ExpressRouter;
    private port !: string;
    private allowedSubDomain !: string;
    private server !: ExpressServer;
    private messageInterface !: MessageInterface;


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
            path: '.env',
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

        this.server = new ExpressServer(this.expressRouter, this.port, this.allowedSubDomain);
    }

    private getPort(): string {
        const port = process.env.PORT;

        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }
    
    private getAllowedSubDomain(): string {
        const allowedSubDomain = process.env.ALLOWED_SUB_DOMAIN;

        if (!allowedSubDomain) {
            throw new Error('No allowed sub domain was found in env file.');
        }
        
        return allowedSubDomain;
    }
}
