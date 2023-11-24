import axios  from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Message } from '@/models/Message'

const apiBaseUrl: string = "http://localhost:3000/api";


export class MessageService {
    private axiosInstance: AxiosInstance

    constructor() {
        this.axiosInstance = axios.create({
                baseURL: apiBaseUrl,
            });
    }

    public async getAllMessageAscyn(): Promise<Message[]> {
        try {
           const config = this.getRequestConfig()
           const messages = await this.axiosInstance.get(`/message/`, config);
           return messages.data;
        }
        catch (error: unknown) {
            throw error;
        }
    }

    public async outgoingMessageAsync(body: string, to: string): Promise<Message> {
        try {
            const message = await this.axiosInstance.post(`/message/outgoing`, 
            { 
                body,
                to
            });
            return message.data;
        } 
        catch (error: unknown) {
            throw error;
        }
    }
    
    private getRequestConfig(): AxiosRequestConfig {
        return {
          headers: {
            'ngrok-skip-browser-warning': '9887',
          },
        };
      }
}