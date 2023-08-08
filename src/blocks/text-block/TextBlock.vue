<script setup>
import { RichText } from '@kernel'
import { Page, BlockType } from '@store'


const { page, block } = defineProps({
  page: Page,
  block: BlockType,
})
</script>

<template>
  <div class="text-block">
    <RichText :page="page" :textBlock="block" />
  </div>
</template>

<style scoped>
</style>
