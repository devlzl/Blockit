<script setup>
import { Block } from '@store'


const { pageBlock } = defineProps({
  pageBlock: Block,
})

function addTextBlock() {
  const note = pageBlock.children[0]
  pageBlock.page.addBlock('text', { text: 'new text block' }, note)
}
</script>

<template>
  <el-button @click="addTextBlock">Add Text Block</el-button>
</template>
