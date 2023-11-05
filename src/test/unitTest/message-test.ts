import { Message } from "../../message/message";
import { MessageService } from "../../message/message-service";
import redis from "redis-mock";

describe("Message Service", () => {
    let sut: MessageService;
    let redisClient: any;

    beforeAll(() => {
        sut = new MessageService();
        redisClient = redis.createClient();
        //jest.resetAllMocks();
    });
  
    afterAll(() => {
        redisClient.quit();
    });   

    
    test("Get all messages that belong to a person, based on the person’s interlocutor", async () => {
        // it should return all messages that belong to a person, based on the person’s interlocutor.
        // this message are inside a redis database
        // Assert : should respond a 200 status code
        // Assert : should have the same number of message of my dummy
        
        let message = new Message(
            1,
            "0763763093",
            "hello !",
            new Date(Date.now())
        )
        
        
    });
});
