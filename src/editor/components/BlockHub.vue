<script setup>
import { Page, Text } from '@store'


const { page } = defineProps({
  page: Page,
})


function addTextBlock() {
  const noteBlockId = page.blockTree.get('root').get('children').get(0).get('id')
  page.addBlock('text', { text: new Text('new text block') }, noteBlockId)
}
</script>

<template>
  <el-button @click="addTextBlock">Add Text Block</el-button>
</template>
