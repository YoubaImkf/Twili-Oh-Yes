import { Message } from "../../Twili-Oh-Yes.Core/Entities/Message";
import { MessageInterface } from "../../Twili-Oh-Yes.Core/Interfaces/MessageInterface";

export class MessageController {
  constructor(private messageInterface: MessageInterface) {}

  async getAllAsync(): Promise<Message[]> {
    return await this.messageInterface.getAllMessagesAsync();
  }

  async getAsync(key: string): Promise<Message | null> {
    return await this.messageInterface.getMessageAsync(key);
  }

  async deleteAsync(smsSid: string): Promise<void | null> {
    await this.messageInterface.deleteMessageAsync(smsSid);
  }

  async outgoing(body: string, to: string): Promise<Message> {
    if (!body) {
      throw new Error("Message body is required");
    }
    if (!to) {
      throw new Error("Recipient phone number is required");
    }
    return await this.messageInterface.outgoingMessage(body, to);
  }

  async incoming(smsSid: string): Promise<Message> {
    return await this.messageInterface.incomingMessage(smsSid);
  }
}
