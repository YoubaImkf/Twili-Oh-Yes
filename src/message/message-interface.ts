import { Message } from './message';

export interface MessageInterface {
    getMessageFromRedis(key: string): Promise<string | null>;
    outgoingMessage(body: string, to: string): Promise<Message>;
    incomingMessage(body: string, from: string): Promise<Message>;
}