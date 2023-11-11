import { Message } from "./Message";
import { MessageInterface } from "./MessageInterface";
import redisClient from "../Configurations/RedisConfiguration";
import twilio, { Twilio } from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

export class MessageService implements MessageInterface {
  private twilioClient: Twilio;
  private readonly accountSid = process.env.TWILIO_ACCOUNT_SID;
  private readonly authToken = process.env.TWILIO_AUTH_TOKEN;

  constructor() {
    this.twilioClient = twilio(this.accountSid, this.authToken);
  }

  public async getMessageAsync(smsSid: string): Promise<Message | null> {
    var twilioMessage = await this.getTwilioMessage(smsSid);
    const message = new Message(
      Date.now(),
      twilioMessage.sid,
      twilioMessage.from,
      twilioMessage.to,
      twilioMessage.body,
      twilioMessage.dateCreated                                  
    );
    
    return message;
  }

  public async getAllMessagesAsync(): Promise<Message[]> {
    try {
      const name = "message:*";
      const keys = await redisClient.keys(name);
      const messages: Message[] = [];

      for (const key of keys) {
        const messageString = await redisClient.get(key);
        if (messageString) {
          const message = JSON.parse(messageString);
          messages.push(message);
        }
      }
      return messages;
    } catch (error) {
      console.error("Error retrieving messages from Redis:", error);
      throw error;
    }
  }

  public async deleteMessageAsync(smsSid: string): Promise<void> {
    try {
      const message = await this.getTwilioMessage(smsSid);
      await redisClient.del(smsSid);

      await this.twilioClient.messages(message.sid).remove();

    } catch (error) {
      console.error("Error deleting message from Redis:", error);
      throw error;
    }
  }

  public async outgoingMessage(body: string, to: string): Promise<Message> {
    const twilioMessage = await this.sendTwilioMessage(body, to);

    const message = new Message(
      Date.now(),
      twilioMessage.sid,
      twilioMessage.from,
      to,
      body,
      new Date()
    );

    await this.storeMessageInRedis(message);

    return message;
  }

  public async incomingMessage(smsSid: string): Promise<Message> {
    let twilioMessage = this.getTwilioMessage(smsSid);

    console.log(twilioMessage);

    const message = new Message(
      Date.now(),
      (await twilioMessage).sid,
      (await twilioMessage).from,
      process.env.TWILIO_PHONE_NUMBER,
      (await twilioMessage).body,
      new Date()
    );

    await this.storeMessageInRedis(message);

    return message;
  }

  //#region Private Methods

  private async sendTwilioMessage(
    body: string,
    to: string
  ): Promise<MessageInstance> {
    const message = await this.twilioClient.messages.create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+33${to}`,
    });
    console.log(`Message SID: ${message.sid}`);

    let createMsg = this.getTwilioMessage(message.sid);

    return createMsg;
  }

  private async getTwilioMessage(smsSid: string) {
    try {
      const message = await this.twilioClient.messages(smsSid).fetch();
      return message;
    } catch (error) {
      console.error("Error fetching Twilio message:", error);
      throw error;
    }
  }

  private async storeMessageInRedis(message: Message): Promise<void> {
    const hashKey = `message:${message.Id}`;
    const hashValue = JSON.stringify(message);

    await redisClient.set(hashKey, hashValue);
  }

  //#endregion
}
