<template>
  <div id="app">
    <ChatHeader />
    <ChatMessages
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      @message-deleted="handleMessageDeleted"
      @message-send="handleMessageSent"
    />
    <ChatInput />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChatHeader from "@/components/ui/ChatHeader.vue";
import ChatMessages from "@/components/ui/ChatMessages.vue";
import ChatInput from "@/components/ui/ChatInput.vue";
import { MessageService } from "@/services/api/MessageService";
import type { Message } from "@/models/Message";

const messageService = new MessageService();

export default defineComponent({
  name: "App",
  components: {
    ChatHeader,
    ChatMessages,
    ChatInput,
  },
  data() {
    return {
      messages: [] as Message[],
    };
  },
  methods:{
    async getAllMessages() {
      const messages = await messageService.getAllMessageAsync();
      this.messages = messages;
    },
    async handleMessageDeleted(deletedMessageId: number) {
      await messageService.deleteMessageAsync(deletedMessageId);
      
      const index = this.messages.findIndex((message) => message.Id === deletedMessageId);

      if (index !== -1) {
        this.messages.splice(index, 1);
      }
    },
    handleMessageSent(){
      this.getAllMessages();
    }
  },
  async mounted() {
    try {
      this.getAllMessages();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
});

</script>
