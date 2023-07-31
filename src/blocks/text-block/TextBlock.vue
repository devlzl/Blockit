<script setup>
import RichText from '@kernel/RichText.vue'
import { Block } from '@store'


const { block } = defineProps({
  block: Block,
})
</script>

<template>
  <div class="text-block">
    <RichText :textBlock="block" />
  </div>
</template>

<style scoped>
</style>
