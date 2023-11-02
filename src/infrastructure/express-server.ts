import express from 'express';
import cors, { CorsOptions } from 'cors';
import { ExpressRouter } from './express-router';
import swaggerUi from 'swagger-ui-express';


export class ExpressServer {
    private express = express();
    private allowedSubDomain: string

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
        allowedSubDomain: string
    ) {
        this.express.use(express.json());
        this.allowedSubDomain = allowedSubDomain;
        this.configureCorsPolicy();
        this.configureRoutes();
        this.setupSwagger();
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureRoutes() {
        this.express.use('/api', this.expressRouter.router);
    }

    private configureCorsPolicy(): void {
        const corsOptions: CorsOptions = {
            origin: (origin, callback) => {
                const isOriginAllowed = !origin || origin === this.allowedSubDomain;
                if (isOriginAllowed) {
                    callback(null, true);
                } else {
                    callback(new Error('CORS: Request origin is not allowed'));
                }
                
            }
        }
        
        this.express.use(cors(corsOptions));
    }
    
    private setupSwagger(): void {
        const swaggerDocument = require('../configuration/swagger.json');
        this.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}
