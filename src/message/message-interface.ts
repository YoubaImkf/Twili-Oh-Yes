import { Message } from './message';

export interface MessageInterface {
    getMessageAsync(key: string): Promise<string | null>;
    getAllMessagesAsync(): Promise<Message[]> ;
    outgoingMessage(body: string, to: string): Promise<Message>;
    incomingMessage(smsSid: string): Promise<Message>;
}