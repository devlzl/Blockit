<script setup>
defineProps({
  text: String,
})
</script>

<template>
  <div class="rich-text" contenteditable="true">{{ text }}</div>
</template>

<style scoped>
</style>
