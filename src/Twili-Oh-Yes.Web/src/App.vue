<template>
  <div id="app">
    <ChatHeader />
    <ChatMessages
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
    <ChatInput @newMessage="addMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ChatHeader from '@/components/ui/ChatHeader.vue';
import ChatMessages from '@/components/ui/ChatMessages.vue';
import ChatInput from '@/components/ui/ChatInput.vue';
import { MessageService } from '@/services/api/MessageService';
import type { Message } from '@/models/Message';

export default defineComponent({
  name: 'App',
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
  methods: {
    addMessage(message: Message) {
      this.messages.push(message);
    },
  },
  async mounted() {
    try {
      const messageService = new MessageService();
      const messages = await messageService.getAllMessageAsync();
      this.messages = messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  },
});
</script>