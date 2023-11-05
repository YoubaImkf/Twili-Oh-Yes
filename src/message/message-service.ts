import { Message } from './message';
import { MessageInterface } from './message-interface';
import redisClient from '../infrastructure/redis-config.ts';
import twilio from 'twilio';

export class MessageService implements MessageInterface {

    constructor() {}   

    public async getMessageFromRedis(key: string): Promise<string | null> {
        // Example of getting a message from Redis
        return await redisClient.get(key);
    }

    public async outgoingMessage(body: string, to: string): Promise<Message> {
        const message = new Message(
            Date.now(), 
            process.env.TWILIO_PHONE_NUMBER,
            to, 
            body, 
            new Date());

        const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        await this.sendMessageViaTwilio(twilioClient, message, to);
        await this.storeMessageInRedis(message);

        return message;
    }

    public async incomingMessage(from: string,  body: string): Promise<Message> {
        const message = new Message(
            Date.now(),
            from,
            process.env.TWILIO_PHONE_NUMBER,
            body,
            new Date()
        );

        await this.storeMessageInRedis(message);

        return message;
    }

    private async sendMessageViaTwilio(twilioClient: any, message: Message, to: string): Promise<void> {
        const twilioMessage = await twilioClient.messages.create({
            body: message.Body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+33${to}`
        });
        console.log(`Message SID: ${twilioMessage.sid}`);
    }

    private async storeMessageInRedis(message: Message): Promise<void> {
        const hashKey = `message:${message.Id}`;
        const hashValue = JSON.stringify(message);
    
        await redisClient.set(hashKey, hashValue);
    }

}
