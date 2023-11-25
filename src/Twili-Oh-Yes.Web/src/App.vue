<template>
  <div id="app">
    <ChatHeader />
    <ChatMessages message="Hello! 😁 This is an incoming message 1" :isIncoming="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖2" :isOutgoing="true" />
    <ChatMessages message="Hello! 😁 This is an incoming message 3" :isIncoming="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖 4" :isOutgoing="true" />
    <ChatMessages message="Hello! 😁 This is an incoming message 5" :isIncoming="true" />
    <ChatMessages message="Hello! 😁 This is an incoming message 6" :isIncoming="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message, his is an outgoing messagehis is an outgoing messagehis is an outgoing messagehis is an outgoing message🦖 7" :isOutgoing="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖 8" :isOutgoing="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖 9  " :isOutgoing="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message, his is an outgoing messagehis is an outgoing messagehis is an outgoing messagehis is an outgoing message🦖 7" :isOutgoing="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖 8" :isOutgoing="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖 9  " :isIncoming="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message, his is an outgoing messagehis is an outgoing messagehis is an outgoing messagehis is an outgoing message🦖 7" :isOutgoing="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖 8" :isIncoming="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message 🦖 9  " :isIncoming="true" />
    <ChatMessages message="Hi there! 😋 This is an outgoing message, his is an outgoing messagehis is adazkdjazbdnabv dhabdnazbdhj bajdbaz,ndb navdav zdvaz ndanzdbanb,nnbnbahgyu 7" :isIncoming="true" />

    
    <ChatInput @newMessage="addMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChatHeader from '@/components/ui/ChatHeader.vue';
import ChatMessages from '@/components/ui/ChatMessages.vue';
import ChatInput from '@/components/ui/ChatInput.vue';

export default defineComponent({
  name: 'App',
  components: {
    ChatHeader,
    ChatMessages,
    ChatInput,
  },
  data() {
    return {
      messages: [] as string[],
    };
  },
  methods: {
    addMessage(message: string) {
      this.messages.push(message);
    },
  },
});
</script>
