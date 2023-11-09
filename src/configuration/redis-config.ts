import { createClient } from "redis";
import 'dotenv/config';

export class RedisClientInstance {
  private static instance: any;
  private static redisPassword: string ;

  constructor(
    private redisPassword: string,
    private redisHost: string,
    private redisPort: number,
  ) {
    this.initialize();
    this.redisPassword = RedisClientInstance.redisPassword;
    this.redisPassword = this.redisPassword;
  }

  public static getInstance(): any {

    const redisPassword = process.env.REDIS_PASSWORD;
    const redisHost = process.env.REDIS_HOST;
    const redisPort = parseInt(process.env.REDIS_PORT || "6379");


    if (!RedisClientInstance.instance) {
      console.log(this.redisPassword);
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