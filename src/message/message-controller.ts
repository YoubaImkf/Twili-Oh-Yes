import { Message } from './message';
import { MessageInterface } from './message-interface';

export class MessageController {
    constructor(private messageInterface: MessageInterface) {}

    async getMessageFromRedis(key: string): Promise<string | null> {
        return await this.messageInterface.getMessageFromRedis(key);
    }

    async outgoingMessage(body: string, to: string): Promise<Message> {
        if (!body)
            throw new Error('message is required');
        if (!to) 
            throw new Error('message is required');

        return await this.messageInterface.outgoingMessage(body, to);
    }

    async incomingMessage(from: string,  body: string): Promise<Message> {
        return await this.messageInterface.incomingMessage(from, body);
    }
}