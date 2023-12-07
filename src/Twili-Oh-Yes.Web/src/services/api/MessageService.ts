import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { Message } from "@/models/Message";

const apiBaseUrl: string = "https://7adc-176-187-48-134.ngrok-free.app/api";

export class MessageService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiBaseUrl,
    });
  }

  public async getAllMessageAsync(): Promise<Message[]> {
    try {
      const config = this.getRequestConfig();
      const messages = await this.axiosInstance.get("/message/", config);
      return messages.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async getMessageAsync(key: number): Promise<Message> {
    try {
      const config = this.getRequestConfig();
      const message = await this.axiosInstance.get(`/message/${key}`, config);
      return message.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async deleteMessageAsync(key: number): Promise<void> {
    try {
      const config = this.getRequestConfig();
      await this.axiosInstance.delete(`/message/${key}`, config);
    } catch (error: unknown) {
      throw error;
    }
  }

  public async updateMessageAsync(updatedMessage: Message): Promise<Message> {
    try {
      const config = this.getRequestConfig();
      const message = await this.axiosInstance.put(
        "/message/",
        updatedMessage,
        config
      );
      return message.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async outgoingMessageAsync(
    body: string,
    to: string
  ): Promise<Message> {
    try {
      const config = this.getRequestConfig();
      const message = await this.axiosInstance.post(
        "/message/outgoing",
        { body, to },
        config
      );
      return message.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  private getRequestConfig(): AxiosRequestConfig {
    return {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    };
  }
}
