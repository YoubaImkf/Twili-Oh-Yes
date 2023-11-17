import { Message } from '../Entities/Message';

export interface MessageInterface {
    getMessageAsync(key: number): Promise<Message | null>;
    getAllMessagesAsync(): Promise<Message[]>;
    deleteMessageAsync(key: number): Promise<void | null>;
    updateMessageAsync(updatedMessage: Message): Promise<Message>;
    outgoingMessage(body: string, to: string): Promise<Message>;
    incomingMessage(smsSid: string): Promise<Message>;
}