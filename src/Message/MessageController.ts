import { Message } from './Message';
import { MessageInterface } from './MessageInterface';

export class MessageController {
    constructor(private messageInterface: MessageInterface) {}

    async getAllAsync(): Promise<Message[]> {
        return await this.messageInterface.getAllMessagesAsync()
    }

    async getAsync(key: string): Promise<Message | null> {
        return await this.messageInterface.getMessageAsync(key);
    }

    async deleteAsync(smsSid: string): Promise<void> {
        return await this.messageInterface.deleteMessageAsync(smsSid);
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