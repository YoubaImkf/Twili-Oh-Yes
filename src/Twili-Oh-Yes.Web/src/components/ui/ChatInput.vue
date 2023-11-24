<template>
  <div class="chat-input-container">
    <textarea 
      v-model="newMessage"
      @input="resizeTextArea"
      @keydown.enter.prevent="createNewLine"
      placeholder="Type a message..."
      class="chat-input"
      ref="textarea"
    ></textarea>
    <SendButton></SendButton>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SendButton from './SendButton.vue';

export default defineComponent({
  name: 'ChatInput',
  components: {
    SendButton,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    createNewLine() {
      this.newMessage += '\n';
      this.resizeTextArea();
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.$emit('newMessage', this.newMessage);
        this.newMessage = '';
        this.resizeTextArea();
      }
    },
    resizeTextArea() {
      const textarea = this.$refs.textarea as HTMLTextAreaElement;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
  },
});
</script>

<style scoped>
.chat-input-container {
  height: 52px;
  max-height: 200px;
  width: 100%;
  position: fixed;
  bottom: 20px;
  left: 0;
  display: flex;
  justify-content: center;
  text-align: center;

}

.chat-input:focus {
  border: 1px solid #5d5e5f;
  box-shadow: 0 0 3px #5d5e5f;
  outline-offset: 0px;
  outline: none;
}

.chat-input {
  width: 90%;
  box-sizing: border-box;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-inline: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  border-radius: 20px;
  resize: none;
  overflow-y: hidden; 
}


@media (min-width: 768px) {
  .chat-input-container {
    width: 766px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>