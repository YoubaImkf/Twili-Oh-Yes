import { Message } from "./Message";
import { MessageInterface } from "./MessageInterface";
import redisClient from "../Configurations/RedisConfiguration";
import twilio, { Twilio } from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { NotFound } from "http-errors";

export class MessageService implements MessageInterface {
  private readonly twilioClient: Twilio;

  constructor() {
    this.twilioClient = this.initializeTwilio();
  }

  public async getMessageAsync(key: string): Promise<Message | null> {
    const redisKey = `message:${key}`;
    const messageString = await redisClient.get(redisKey);
    if (!messageString) {
      throw new NotFound(`Message with key ${key} not found`);
    }
    const message = JSON.parse(messageString);
    return message;
  }

  public async getAllMessagesAsync(): Promise<Message[]> {
    const keys = await redisClient.keys("message:*");
    const messages: Message[] = [];

    for (const key of keys) {
      const messageString = await redisClient.get(key);
      if (messageString) {
        const message = JSON.parse(messageString);
        messages.push(message);
      }
    }

    return messages;
  }

  public async deleteMessageAsync(key: string): Promise<void | null> {
    const message = await this.getMessageAsync(key);
    const redisKey = `message:${key}`;

    if (!message) {
      throw new NotFound(`Message with key ${key} not found`);
    }
    await redisClient.del(redisKey);

    // if (message?.SmsSid) {
    //   await this.twilioClient.messages(message.SmsSid).remove();
    // }
  }

  public async outgoingMessage(body: string, to: string): Promise<Message> {
    const twilioMessage = await this.sendTwilioMessage(body, to);
    const message = this.createMessageFromTwilio(
      twilioMessage,
      to,
      body
    );

    await this.storeMessageInRedis(message);

    return message;
  }

  public async incomingMessage(smsSid: string): Promise<Message> {
    const twilioMessage = await this.getTwilioMessage(smsSid);
    const message = this.createMessageFromTwilio(
      twilioMessage,
      twilioMessage.to,
      twilioMessage.body
    );
    await this.storeMessageInRedis(message);
    return message;
  }

  private initializeTwilio(): Twilio {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    if (!accountSid || !authToken) {
      throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required.");
    }
    return twilio(accountSid, authToken);
  }

  private async sendTwilioMessage(
    body: string,
    to: string
  ): Promise<MessageInstance> {
    const message = await this.twilioClient.messages.create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER || "",
      to: `+33${to}`,
    });

    return this.getTwilioMessage(message.sid);
  }

  private async getTwilioMessage(smsSid: string): Promise<MessageInstance> {
    const message = await this.twilioClient.messages(smsSid).fetch();
    return message;
  }

  private createMessageFromTwilio(
    twilioMessage: MessageInstance,
    to: string,
    body: string
  ): Message {
    return new Message(
      Date.now(),
      twilioMessage.sid,
      twilioMessage.from,
      to,
      body,
      new Date()
    );
  }

  private async storeMessageInRedis(message: Message): Promise<void> {
    const hashKey = `message:${message.Id}`;
    const hashValue = JSON.stringify(message);
    await redisClient.set(hashKey, hashValue);
  }
}
