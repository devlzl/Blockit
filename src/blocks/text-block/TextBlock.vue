<script setup>
import { RichText } from '@kernel'
import { Page, BlockType } from '@store'


const { page, block } = defineProps({
  page: Page,
  block: BlockType,
})

const level = block.get('props').get('level') ?? 0
const initFocus = block.get('props').get('initFocus') ?? 'end'
</script>

<template>
  <div
    class="text-block"
    :style="{
      fontSize: {
        0: '16px',
        1: '30px',
        2: '26px',
        3: '20px',
      }[level]
    }">
    <RichText :page="page" :textBlock="block" :initFocus="initFocus" />
  </div>
</template>

<style scoped>
</style>
