export class Message {
    constructor(
        public Id: number,
        public From: string | undefined,
        public To: string | undefined,
        public Body: string,
        public CreatedDate: Date
    ) {}
}