<script setup>
import { builtinBlockViews } from '@blocks'
import { Block } from '@store'
import { ref } from 'vue'


const { noteBlock } = defineProps({
  noteBlock: Block,
})


const blocks = ref(noteBlock.children.slice())
noteBlock.events.childrenUpdate.on((data) => {
  const { type, index, block } = data
  if (type === 'add') {
    blocks.value.splice(index, 0, block)
  } else if (type === 'update') {
    blocks.value[index] = block
  } else if (type === 'delete') {
    blocks.value.splice(index, 1)
  }
})
</script>

<template>
  <div class="note-block" contenteditable="true">
    <component
      v-for="block of blocks"
      :is="builtinBlockViews[block.type]"
      :block="block">
    </component>
  </div>
</template>

<style scoped>
</style>
