import { Message } from './message';
import { MessageInterface } from './messageInterface';

export class MessageController {
    constructor(private messageInterface: MessageInterface) {}

    GetById(id: number): Message | string {
        return this.messageInterface.GetById(id);
    }

    Add(message: Message): Message {
        if (!message) throw new Error('message is required');
        return this.messageInterface.Add(message);
    }

    Delete(id: number): void {
        this.messageInterface.Delete(id);
    }

    Update(message: Message): Message {
        if (!message) throw new Error('message is required');
        return this.messageInterface.Update(message);
    }

}