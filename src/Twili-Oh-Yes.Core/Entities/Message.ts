import { Direction } from "../Enums/Direction";

export class Message {
    constructor(
        public Id: number,
        public SmsSid: string,
        public From: string,
        public To: string,
        public Body: string,
        public CreatedDate: Date,
        public Direction: Direction,
    ) { }
}