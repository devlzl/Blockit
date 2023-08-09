<script setup>
import { onMounted, ref, shallowRef, triggerRef } from 'vue'
import PencilBox from './components/PencilBox.vue'
import { SelectionManager } from './utils/SelectionManager'
import { Page, BlockType, EventEmitter } from '@store'
import { SurfaceManager } from '@visual'
import { builtinBlockViews } from '@blocks'


const { page, pageBlock } = defineProps({
  page: Page,
  pageBlock: BlockType,
})


const canvasRef = ref(null)
const toolChangeEvent = new EventEmitter()
onMounted(() => {
  const surfaceBlock = pageBlock.get('children').toArray().find(block => block.get('type') === 'surface')
  const surfaceManager = new SurfaceManager(canvasRef.value, surfaceBlock)
  const selectionManager = new SelectionManager(page, surfaceManager, toolChangeEvent)
})


function handleToolChange(type) {
  toolChangeEvent.emit(type)
}


function getNoteBlocks() {
  return pageBlock.get('children').toArray().filter(block => block.get('type') === 'note')
}
const noteBlocks = shallowRef(getNoteBlocks())
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
    <PencilBox @tool-change="handleToolChange" :toolChangeEvent="toolChangeEvent" />
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
    padding: 30px;
    background-color: white;
    box-shadow: 1px 1px 5px lightgray;
    border-radius: 7px;
    cursor: move;
  }
}
</style>
