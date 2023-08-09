<script setup>
import { ref, watch } from 'vue'
import { Page, Text } from '@store'
import FormatBar from './components/FormatBar.vue'
import BlockHub from './components/BlockHub.vue'
import { builtinBlockSchemas, builtinBlockViews } from '@blocks'


const mode = ref('docs')
// const mode = ref('whiteboard')

function init() {
  const page = new Page()
  page.register(builtinBlockSchemas)
  const pageBlockId = page.addBlock('page', { title: new Text('new page'), mode: mode.value })
  const noteBlockId = page.addBlock('note', {}, pageBlockId)
  const textBlockId = page.addBlock('text', { text: new Text('hello world') }, noteBlockId)
  const surfaceBlockId = page.addBlock('surface', {}, pageBlockId)
  return { page, pageBlockId }
}
const { page, pageBlockId } = init()
const pageBlock = page.getBlockById(pageBlockId)
watch(mode, (value) => {
  page.updateBlock(pageBlockId, { mode: value })
})


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
    <div class="tool-bar">
      <el-switch
        class="switch"
        v-model="mode"
        inactive-value="docs" inactive-text="Docs"
        active-value="whiteboard" active-text="Whiteboard"
      />
      <el-button @click="page.undo()"><i class="bi bi-arrow-counterclockwise"></i></el-button>
      <el-button @click="page.redo()"><i class="bi bi-arrow-clockwise"></i></el-button>
    </div>
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
      :page="page"
      :pageBlock="pageBlock">
    </component>
  </div>
</template>

<style scoped lang="scss">
.editor {
  margin: 100px 70px;
  .tool-bar {
    position: fixed;
    top: 14px;
    left: 20px;
    background-color: white;
    padding: 10px;
    box-shadow: 1px 1px 5px lightgray;
    border-radius: 7px;
    .switch {
      margin-right: 20px;
    }
  }
}
</style>
