import { Message } from './message';
import { MessageInterface } from './messageInterface';

export class MessageService implements MessageInterface {
    private messages: Message[] = [];
    private maxmessageId: number = 0;
    private readonly filePath: string = "src/database/message.json";

    constructor() {
        // this.loadmessagesFromFile();
    }   

    GetById(id: number): Message | string {
        const message = this.messages.find((u) => u.id === id);
        if(message == null){
            return "message doesnt exist";
        }
        return message;
    }

    Add(message: Message): Message {
        if (!message) {
            throw new Error('message is required');
        }

        message.id = this.generateUniqueId();
        this.messages.push(message);
        // this.savemessagesToFile();

        return message;
    }

    Delete(id: number): void {
        const messageExists = this.GetById(id);
        if (!messageExists) {
            throw new Error('message does not exist');
        }

        this.messages = this.messages.filter(message => message.id !== id);
        // this.savemessagesToFile();
    }

    Update(message: Message): Message {
        const messageExists = this.GetById(message.id);
        if (!messageExists) {
            throw new Error('message does not exist');
        }

        const messageIndex = this.messages.findIndex(u => u.id === message.id);
        this.messages[messageIndex] = message;
        // this.savemessagesToFile();

        return message;
    }


    //#region Private 
    private generateUniqueId(): number {
        this.maxmessageId++;
        return this.maxmessageId;
    }
    //#endregion
}
