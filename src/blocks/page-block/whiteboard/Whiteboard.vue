<script setup>
import { onMounted, ref, shallowRef, triggerRef } from 'vue'
import PencilBox from './components/PencilBox.vue'
import { SelectionManager } from './utils/SelectionManager'
import { Page, BlockType } from '@store'
import { EventEmitter } from '@store'
import { Renderer } from '@visual'
import { builtinBlockViews } from '@blocks'


const { page, pageBlock } = defineProps({
  page: Page,
  pageBlock: BlockType,
})


const canvasRef = ref(null)
const toolChangeEvent = new EventEmitter()
onMounted(() => {
  const renderer = new Renderer(canvasRef.value)
  const selection = new SelectionManager(page, renderer, toolChangeEvent)
})


function handleToolChange(type) {
  toolChangeEvent.emit(type)
}


const noteBlocks = shallowRef(pageBlock.get('children').toArray())
page.events.blockUpdate.on((update) => {
  const ids = noteBlocks.value.map(block => block.get('id'))
  const index = ids.indexOf(update.blockId)
  if (index > -1) {
    triggerRef(noteBlocks)
  }
})
</script>

<template>
  <div class="whiteboard">
    <canvas ref="canvasRef"></canvas>
    <PencilBox @tool-change="handleToolChange" />
    <div
      v-for="block of noteBlocks"
      class="note-block-container"
      :blockid="block.get('id')"
      :style="{
        left: `${block.get('props')?.get('position')?.x ?? 200}px`,
        top: `${block.get('props')?.get('position')?.y ?? 200}px`
      }">
      <component
        :is="builtinBlockViews[block.get('type')]"
        :page="page"
        :noteBlock="block">
      </component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.whiteboard {
  canvas {
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
  }

  .note-block-container {
    position: absolute;
    width: 400px;
    padding: 20px;
    background-color: white;
    box-shadow: 1px 1px 5px lightgray;
    border-radius: 7px;
    cursor: move;
  }
}
</style>
