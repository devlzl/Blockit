<script setup>
import { onMounted, ref } from 'vue'
import ToolBar from './components/ToolBar.vue'
import { SelectionManager } from './utils/SelectionManager'
import { Block } from '@store'
import { EventEmitter } from '@store'
import { Renderer } from '@visual'


const { pageBlock } = defineProps({
  pageBlock: Block,
})
pageBlock.events.toolChange = new EventEmitter()


const canvasRef = ref(null)
onMounted(() => {
  const renderer = new Renderer(canvasRef.value)
  const selection = new SelectionManager(canvasRef.value, pageBlock, renderer)
})


function handleToolChange(type) {
  pageBlock.events.toolChange.emit(type)
}
</script>

<template>
  <div mode="whiteboard">
    <canvas ref="canvasRef"></canvas>
    <ToolBar @tool-change="handleToolChange" />
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
