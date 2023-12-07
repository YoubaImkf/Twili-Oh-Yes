<script setup lang="ts">
import type { Message } from '@/models/Message';
import { ref, onMounted } from 'vue';
import { MessageService } from '@/services/api/MessageService.js';
// import io from 'socket.io-client';

import TextArea from '@/components/ui/ChatInput.vue';


// const messageService = new MessageService();
// const messages = ref<Message[]>([]);
// const socket = io('http://localhost:3000'
// // ,{
// //   extraHeaders: {
// //     "ngrok-skip-browser-warning": "69420"
// //   }
// // }
// );


// async function updateMessages() {
//   try {
//     const updatedMessages = await messageService.getAllMessageAscyn();
//     messages.value = updatedMessages;
//   } catch (error) {
//     console.error(error);
//   }
// }

onMounted(() => {
  // updateMessages();

  // // Set up socket.io event listener for new messages
  // socket.on('newMessage', (newMessage: Message) => {
    // // Update the messages array when a new message is received
    // messages.value = [...messages.value, newMessage];
  // });
});


</script>


<template>
  <div class="real-time-updates">
    <ul>
      <TextArea />
      <!-- <li v-for="message in messages" :key="message.Id">
        <strong>{{ message.From }}:</strong> {{ message.Body }}
      </li> -->
    </ul>
  </div>
</template>

