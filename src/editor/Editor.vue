<script setup>
import { ref, watch } from 'vue'
import { Page, Text } from '@store'
import Toolbar from './components/Toolbar.vue'
import { builtinBlockSchemas, builtinBlockViews } from '@blocks'
import RichText from '@kernel/RichText.vue'
import { Kernel } from '@kernel/Kernel'
import * as Y from 'yjs'


const mode = ref('docs')

function createPageBlock() {
  const page = new Page()
  page.register(builtinBlockSchemas)
  page.events.addRoot.on(() => {
    console.log('root added')
  })

  const pageBlock = page.addBlock('page', {
    title: new Text('new page'),
    mode: mode.value,
  })
  watch(mode, (value) => {
    page.updateBlock(pageBlock.id, { mode: value })
  })

  const noteBlock = page.addBlock('note', {}, pageBlock)
  const textBlock = page.addBlock('text', { text: 'hello world' }, noteBlock)
  return pageBlock
}
// const pageBlock = createPageBlock()


const yDoc = new Y.Doc()
const yText = yDoc.getText()
const kernel = new Kernel(yText)
</script>

<template>
  <el-switch
    class="switch"
    v-model="mode"
    inactive-value="docs" inactive-text="Docs"
    active-value="whiteboard" active-text="Whiteboard"
  />
  <Toolbar :kernel="kernel" />
  <!-- <component
    :is="builtinBlockViews.page"
    :pageBlock="pageBlock">
  </component> -->
  <RichText :kernel="kernel" />
</template>

<style scoped>
.switch {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
