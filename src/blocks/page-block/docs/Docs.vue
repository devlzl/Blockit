<script setup>
import { builtinBlockViews } from '@blocks'
import { Page, BlockType } from '@store'
import { shallowRef } from 'vue'


const { page, pageBlock } = defineProps({
  page: Page,
  pageBlock: BlockType,
})


const noteBlocks = shallowRef(pageBlock.get('children').toArray())
page.events.blockUpdate.on((update) => {
  const { blockId, part } = update
  if (blockId === pageBlock.get('id') && part === 'children') {
    noteBlocks.value = pageBlock.get('children').toArray()
  }
})
</script>

<template>
  <div mode="docs">
    <component
      v-for="block of noteBlocks"
      :is="builtinBlockViews[block.get('type')]"
      :page="page"
      :noteBlock="block">
    </component>
  </div>
</template>

<style scoped>
</style>
