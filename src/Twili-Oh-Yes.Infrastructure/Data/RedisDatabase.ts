import { createClient } from "redis";
import 'dotenv/config';

export class RedisClientInstance {
  private static instance: any;
  private static readonly redisPassword = process.env.REDIS_PASSWORD;
  private static readonly redisHost = process.env.REDIS_HOST;
  private static  redisPort = parseInt(process.env.REDIS_PORT || "6379");

  constructor(
  ) {
    this.initialize();
  }

  public static getInstance(): any {
    if (!RedisClientInstance.instance) {
      RedisClientInstance.instance = createClient({
        
        password: this.redisPassword,
        socket: {
          host: this.redisHost,
          port: this.redisPort,
        },
      });

      RedisClientInstance.instance.on("error", (err: any) =>
        console.error("Redis Client Error", err)
      );

      this.setupRedis();
    }

    return RedisClientInstance.instance;
  }

  private static async setupRedis(): Promise<void> {
    if (!RedisClientInstance.instance.connected) {
      await RedisClientInstance.instance.connect();
    }
  }

  private initialize(): void {}
}

const redisClient = RedisClientInstance.getInstance();
export default redisClient;