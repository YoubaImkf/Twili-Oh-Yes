<template>
  <footer>
    <div class="chat-input-container">
      <textarea
        v-model="newMessage"
        @input="resizeTextArea"
        @keydown.enter.prevent="createNewLine"
        placeholder="Type a message..."
        class="chat-input"
        ref="textarea"
      ></textarea>
      <SendButton @sendMessage="sendMessage"></SendButton>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SendButton from "./SendButton.vue";
import { MessageService } from "@/services/api/MessageService";

const messageService = new MessageService();

export default defineComponent({
  name: "ChatInput",
  components: {
    SendButton,
  },
  data() {
    return {
      newMessage: "",
    };
  },
  methods: {
    resizeTextArea() {
      const textarea = this.$refs.textarea as HTMLTextAreaElement;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    createNewLine() {
      this.newMessage += "\n";
      this.resizeTextArea();
    },
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        try {
          await messageService.sendMessageAsync(this.newMessage.trim());
          this.$emit("message-send", this.newMessage);
          this.newMessage = "";
          this.resizeTextArea();
        } catch (error: unknown) {
          console.error("Error sending message:", error);
        }
      }
    },
  },
});
</script>

<style scoped>
footer {
  width: 100%;
  bottom: 0;
  position: fixed;
  height: 80px;
  background-color: #343541e3;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
}

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
  padding-inline: 10px;
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
  font-size: 14px;
  border-radius: 20px;
  resize: none;
  overflow-y: hidden;
  max-height: 200px;
}

@media (min-width: 768px) {
  .chat-input-container {
    width: 766px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
