<script setup lang="ts">
import type { Message } from '@/models/Message';
import { MessageService } from '@/services/MessageService';
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

const messageService = new MessageService();
const messages = ref<Message[]>([]);

const socket = io('http://localhost:3000');

async function updateMessages() {
  try {
    const updatedMessages = await messageService.getAllMessageAscyn();
    messages.value = updatedMessages;
  } catch (error) {
    console.error(error);
  }
}

// Fetch messages when the component is mounted
onMounted(() => {
  updateMessages();
});

// Listen for 'messageUpdate' event from the server
socket.on('messageUpdate', updateMessages);

</script>

<template>
  <div class="real-time-updates">
    <h1>Real-Time Message Updates</h1>
    <ul>
      <li v-for="message in messages" :key="message.Id">{{ message.Body }}</li>
    </ul>
  </div>
</template>

<style>
/* Your styles here */
</style>
