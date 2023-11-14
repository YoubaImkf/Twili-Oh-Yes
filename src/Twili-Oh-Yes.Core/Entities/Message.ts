import { Direction } from "../Enums/Direction";

export class Message {
    constructor(
        public Id: number,
        public SmsSid: string,
        public From: string | undefined,
        public To: string | undefined,
        public Body: string,
        public CreatedDate: Date,
        public Direction: Direction,
    ) {}
}