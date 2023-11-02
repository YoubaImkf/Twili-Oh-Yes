import { Message } from './message';

export interface MessageInterface {
    GetById(id: number): Message | string;
    Add(user: Message): Message;
    Delete(id: number): void;
    Update(user: Message): Message;
}