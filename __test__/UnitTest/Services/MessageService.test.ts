import { MessageService } from '../../../src/Twili-Oh-Yes.Core/Services/MessageService';
import { Message } from '../../../src/Twili-Oh-Yes.Core/Entities/Message';
import redisClient from '../../../src/Twili-Oh-Yes.Infrastructure/Data/RedisDatabase';
import twilio from 'twilio';

jest.mock('../../../src/Twili-Oh-Yes.Infrastructure/Data/RedisDatabase');

describe('MessageService - getAllMessagesAsync', () => {
  let messageService: MessageService;

  beforeAll(() => {
    messageService = new MessageService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return all messages from Redis', async () => {
    // Arrange
    (redisClient.keys as jest.Mock).mockResolvedValue(['message:1', 'message:2']);
    (redisClient.get as jest.Mock).mockImplementation(async (key: string) => {
      switch (key) {
        case 'message:1':
          return JSON.stringify({ Id: 1, Body: 'Hello', To: '123', Direction: 'Outgoing' });
        case 'message:2':
          return JSON.stringify({ Id: 2, Body: 'Hi', To: '456', Direction: 'Incoming' });
        default:
          return null;
      }
    });

    // Act
    const result = await messageService.getAllMessagesAsync();

    // Assert
    expect(result).toEqual([
      { Id: 1, Body: 'Hello', To: '123', Direction: 'Outgoing' },
      { Id: 2, Body: 'Hi', To: '456', Direction: 'Incoming' },
    ]);
  });
  
});



