<script setup>
import { Page } from '@store'


const { page } = defineProps({
  page: Page,
})


function addTextBlock() {
  const note = page.root.children[0].children[0]
  page.addBlock('text', { text: 'new text block' + String(Math.random()).slice(2,3) }, note)
}
</script>

<template>
  <el-button @click="addTextBlock">Add Text Block</el-button>
</template>
