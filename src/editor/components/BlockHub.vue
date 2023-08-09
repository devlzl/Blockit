<script setup>
import { Page, Text } from '@store'


const { page } = defineProps({
  page: Page,
})


function addTextBlock(level) {
  const noteBlockId = page.blockTree.get('root').get('children').get(0).get('id')
  page.addBlock('text', { text: new Text('new text block'), level: level }, noteBlockId)
}
</script>

<template>
  <div class="block-hub">
    <el-button @click="addTextBlock(0)">Add Text</el-button>
    <el-button @click="addTextBlock(1)">Add Heading 1</el-button>
    <el-button @click="addTextBlock(2)">Add Heading 2</el-button>
    <el-button @click="addTextBlock(3)">Add Heading 3</el-button>
  </div>
</template>

<style scoped lang="scss">
.block-hub {
  margin-top: 20px;
}
</style>
