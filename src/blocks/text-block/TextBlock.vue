<script setup>
import { RichText } from '@kernel'
import { Page, BlockType } from '@store'


const { page, block } = defineProps({
  page: Page,
  block: BlockType,
})

const initFocus = block.get('props').get('initFocus') ?? 'end'
</script>

<template>
  <div class="text-block">
    <RichText :page="page" :textBlock="block" :initFocus="initFocus" />
  </div>
</template>

<style scoped>
</style>
