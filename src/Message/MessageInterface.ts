import { Message } from './Message';

export interface MessageInterface {
    getMessageAsync(smsSid: string): Promise<Message | null>
    getAllMessagesAsync(): Promise<Message[]> ;
    deleteMessageAsync(smsSid: string): Promise<void>;
    outgoingMessage(body: string, to: string): Promise<Message>;
    incomingMessage(smsSid: string): Promise<Message>;
}