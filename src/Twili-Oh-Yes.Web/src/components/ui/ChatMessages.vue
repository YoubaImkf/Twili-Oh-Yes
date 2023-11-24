<template>
  <div class="chat-message" :class="{ 'outgoing': isOutgoing, 'incoming': isIncoming }">
    <div class="message-container">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'ChatMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    isOutgoing: {
      type: Boolean,
      default: false,
    },
    isIncoming: {
      type: Boolean as PropType<boolean>,
      default: false,
    },  
  },
});
</script>

<style scoped>
.chat-message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;
  clear: both;
  position: relative;
}

.chat-message p {
  font-weight: 600;
}
.outgoing {
  float: right;
  background-color: white;
  color: rgb(94, 94, 94);
}

.incoming {
  float: left;
  background-color: #42e89e;
  color: rgb(255, 255, 255);
}

.chat-message {
  position: relative;
  margin-bottom: 20px;
}

</style>
