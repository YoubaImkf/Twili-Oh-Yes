import { Message } from "../../Twili-Oh-Yes.Core/Entities/Message";
import { MessageInterface } from "../../Twili-Oh-Yes.Core/Interfaces/MessageInterface";

export class MessageController {
  constructor(private messageInterface: MessageInterface) { }

  async getAllAsync(): Promise<Message[]> {
    return await this.messageInterface.getAllMessagesAsync();
  }

  async getAsync(key: number): Promise<Message> {
    if (!key)
      throw new Error("The key is required 😡")

    return await this.messageInterface.getMessageAsync(key);
  }

  async deleteAsync(key: number): Promise<void> {
    if (!key)
      throw new Error("The key is required 😡")

    await this.messageInterface.deleteMessageAsync(key);
  }

  async updateAsync(updatedMessage: Message): Promise<Message> {
    if (!updatedMessage)
      throw new Error("The body is required 😡")

    return await this.messageInterface.updateMessageAsync(updatedMessage);
  }

  async outgoing(body: string, to: string): Promise<Message> {
    if (!body)
      throw new Error("Message body is required 😡");
  
    if (!to)
      throw new Error("Recipient phone number is required 😡");
    
    return await this.messageInterface.outgoingMessage(body, to);
  }

  async incoming(smsSid: string): Promise<Message> {
    if (!smsSid) 
      throw new Error("the smsSid is required 😡")

    return await this.messageInterface.incomingMessage(smsSid);
  }
}
