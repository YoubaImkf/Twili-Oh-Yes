<template>
  <header class="chat-header">
    <h1>Twili-Oh-Yes</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatHeader',
});
</script>

<style scoped>
.chat-header {
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(52,53,65,.9);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
  padding: 10px; 
  z-index: 1;
  font-size: 0.63rem
}
</style>
