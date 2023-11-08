import { Message } from './message';
import { MessageInterface } from './message-interface';

export class MessageController {
    constructor(private messageInterface: MessageInterface) {}

    async getAsync(key: string): Promise<string | null> {
        return await this.messageInterface.getMessageAsync(key);
    }

    async getAllAsync(): Promise<Message[]> {
        return await this.messageInterface.getAllMessagesAsync()
    }

    async outgoing(body: string, to: string): Promise<Message> {
        if (!body)
            throw new Error('message is required');
        if (!to) 
            throw new Error('message is required');

        return await this.messageInterface.outgoingMessage(body, to);
    }

    async incoming(smsSid: string): Promise<Message> {
        return await this.messageInterface.incomingMessage(smsSid);
    }
}