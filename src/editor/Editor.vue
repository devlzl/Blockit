<script setup>
import { ref, watch } from 'vue'
import { Page, Text } from '@store'
import FormatBar from './components/FormatBar.vue'
import BlockHub from './components/BlockHub.vue'
import { builtinBlockSchemas, builtinBlockViews } from '@blocks'


const mode = ref('docs')
// const mode = ref('whiteboard')

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
  const textBlock = page.addBlock('text', { text: new Text('hello world') }, noteBlock)
  return pageBlock
}
const pageBlock = createPageBlock()
const page = pageBlock.page


const showFormatBar = ref(false)
const formatBarX = ref(0)
const formatBarY = ref(0)
page.events.selectionChange.on(() => {
  if (page.selection.kernels.size === 0) {
    showFormatBar.value = false
    return
  }
  showFormatBar.value = true
  const range = document.getSelection().getRangeAt(0)
  const { x, y } = range.getBoundingClientRect()
  formatBarX.value = x
  formatBarY.value = y - 60
})
</script>

<template>
  <div class="editor">
    <el-switch
      class="switch"
      v-model="mode"
      inactive-value="docs" inactive-text="Docs"
      active-value="whiteboard" active-text="Whiteboard"
    />
    <FormatBar
      v-if="showFormatBar"
      :page="page"
      style="position: absolute;"
      :style="{
        left: `${formatBarX}px`,
        top: `${formatBarY}px`,
      }"
    />
    <BlockHub :page="page" />
    <component
      :is="builtinBlockViews.page"
      :pageBlock="pageBlock">
    </component>
  </div>
</template>

<style scoped lang="scss">
.editor {
  margin: 100px 70px;
  .switch {
    position: fixed;
    top: 20px;
    left: 30px;
  }
}
</style>
