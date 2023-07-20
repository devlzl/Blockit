<script setup>
import { ref } from 'vue'
import RichText from '@rich-text'

defineProps({
  text: String,
})


const done = ref(false)
</script>

<template>
  <div class="todo-block">
    <input type="checkbox" v-model="done" />
    <RichText :text="text" />
  </div>
</template>

<style scoped>
.todo-block {
  display: flex;
}
</style>
