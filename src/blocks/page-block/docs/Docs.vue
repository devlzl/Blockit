<script setup>
import { builtinBlockViews } from '@blocks'
import { Block } from '@store'


const { pageBlock } = defineProps({
  pageBlock: Block,
})

const noteBlocks = pageBlock.children
</script>

<template>
  <div mode="docs">
    <component
      v-for="block of noteBlocks"
      :is="builtinBlockViews[block.type]"
      :noteBlock="block">
    </component>
  </div>
</template>

<style scoped>
</style>
