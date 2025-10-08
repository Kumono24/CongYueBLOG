<template>
  <span @click="changeText" class="click-text">
    {{ currentText }}
  </span>
</template>

<script setup>
import { ref } from 'vue'

const originalText = '为每一个人的美好生活向往而努力'
const changedText = '我变了！'

const currentText = ref(originalText)

function changeText() {
  currentText.value = currentText.value === originalText ? changedText : originalText
}
</script>

<style scoped>
.click-text {
  cursor: pointer;
  user-select: none;
  color: #3eaf7c;
  font-weight: bold;
}
</style>
