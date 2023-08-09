<script setup>
import { builtinBlockViews } from '@blocks'
import { Page, BlockType } from '@store'
import { shallowRef } from 'vue'


const { page, noteBlock } = defineProps({
  page: Page,
  noteBlock: BlockType,
})


const blocks = shallowRef(noteBlock.get('children').toArray())
page.events.blockUpdate.on((update) => {
  const { blockId, part } = update
  if (blockId === noteBlock.get('id') && part === 'children') {
    // TODO: may need to be more precise
    blocks.value = noteBlock.get('children').toArray()
  }
})
</script>

<template>
  <div class="note-block" contenteditable="true">
    <component
      v-for="block of blocks"
      :is="builtinBlockViews[block.get('type')]"
      :page="page"
      :block="block">
    </component>
  </div>
</template>

<style scoped>
.note-block {
  cursor: text;
}
</style>
