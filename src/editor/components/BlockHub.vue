<script setup>
import { Page, Text } from '@store'


const { page } = defineProps({
  page: Page,
})


function addTextBlock() {
  const note = page.root.children[0].children[0]
  page.addBlock('text', { text: new Text('new text block') }, note)
}
</script>

<template>
  <el-button @click="addTextBlock">Add Text Block</el-button>
</template>
