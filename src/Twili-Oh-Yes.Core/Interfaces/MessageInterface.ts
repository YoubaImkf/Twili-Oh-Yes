import { Message } from '../Entities/Message';

export interface MessageInterface {
    getMessageAsync(smsSid: string): Promise<Message | null>;
    getAllMessagesAsync(): Promise<Message[]>;
    deleteMessageAsync(smsSid: string): Promise<void | null>;
    outgoingMessage(body: string, to: string): Promise<Message>;
    incomingMessage(smsSid: string): Promise<Message>;
}