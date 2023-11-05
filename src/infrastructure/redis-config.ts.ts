import { createClient } from "redis";
require('dotenv').config();

export class RedisClientInstance {
  private static instance: any;

  constructor(
  ) {
    this.initialize();
  }

  public static getInstance(): any {
    const redisPassword = process.env.REDIS_PASSWORD;
    const redisHost = process.env.REDIS_HOST;
    const redisPort = parseInt(process.env.REDIS_PORT || "6379");


    if (!RedisClientInstance.instance) {
      RedisClientInstance.instance = createClient({
        password: redisPassword,
        socket: {
          host: redisHost,
          port: redisPort,
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
