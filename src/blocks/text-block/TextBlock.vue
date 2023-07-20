<script setup>
import RichText from '@rich-text'

defineProps({
  text: String,
})
</script>

<template>
  <div class="text-block">
    <RichText :text="text" />
  </div>
</template>

<style scoped>
</style>
