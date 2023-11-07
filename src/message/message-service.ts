import { Message } from './message';
import { MessageInterface } from './message-interface';
import redisClient from '../infrastructure/redis-config.ts';
import twilio, { Twilio } from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

export class MessageService implements MessageInterface {
    private twilioClient: Twilio;
    private readonly accountSid = process.env.TWILIO_ACCOUNT_SID;
    private readonly authToken = process.env.TWILIO_AUTH_TOKEN;

    constructor() {
        this.twilioClient = twilio(this.accountSid, this.authToken);
    }   

    public async getMessageFromRedis(key: string): Promise<string | null> {
        // Example of getting a message from Redis
        return await redisClient.get(key);
    }

    public async outgoingMessage(body: string, to: string): Promise<Message> {
        const twilioMessage = await this.sendMessageViaTwilio(body, to);

        const message = new Message(
            Date.now(), 
            twilioMessage.sid,
            twilioMessage.from,
            to, 
            body, 
            new Date());

        await this.storeMessageInRedis(message);

        return message;
    }

    public async incomingMessage(body: string, from: string, smsSid: string): Promise<Message> {
        console.log('Body:', body); // Log the 'body' parameter
        console.log('From:', from); // Log the 'from' parameter

        console.log(smsSid)
        let twilioMessage = this.getTWilioMesssageAsync(smsSid);

        console.log(twilioMessage)

        const message = new Message(
            Date.now(),
            (await twilioMessage).sid,
            from,
            process.env.TWILIO_PHONE_NUMBER,
            (await twilioMessage).body,
            new Date()
        );

        await this.storeMessageInRedis(message);

        return message;
    }

    private async sendMessageViaTwilio(body: string, to: string): Promise<MessageInstance> {
        const twilioMessage = await this.twilioClient.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+33${to}`
        });
        console.log(`Message SID: ${twilioMessage.sid}`);

        let createMsg = this.getTWilioMesssageAsync(twilioMessage.sid);

        return createMsg;
    }

    private async getTWilioMesssageAsync(smsSid: string) {
        try {
            const message = await this.twilioClient.messages(smsSid).fetch();
            return message;
        } catch (error) {
            console.error('Error fetching Twilio message:', error); 
            throw error; 
        }
    }
    
    private async storeMessageInRedis(message: Message): Promise<void> {
        const hashKey = `message:${message.Id}`;
        const hashValue = JSON.stringify(message);
    
        await redisClient.set(hashKey, hashValue);
    }

}
