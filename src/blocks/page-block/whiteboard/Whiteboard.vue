<script setup>
import { onMounted, ref } from 'vue'
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
  const selection = new SelectionManager(canvasRef.value, renderer, toolChangeEvent)
})


function handleToolChange(type) {
  toolChangeEvent.emit(type)
}


const noteBlocks = pageBlock.get('children').toArray()
</script>

<template>
  <div mode="whiteboard">
    <canvas ref="canvasRef"></canvas>
    <PencilBox @tool-change="handleToolChange" />
    <component
      v-for="block of noteBlocks"
      :is="builtinBlockViews[block.get('type')]"
      :page="page"
      :noteBlock="block">
    </component>
  </div>
</template>

<style scoped lang="scss">
canvas {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
}
</style>
