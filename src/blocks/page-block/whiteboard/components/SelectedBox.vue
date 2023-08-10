<script setup>
import { ElementType } from '@visual'
import { ref } from 'vue'


const { selectedElement } = defineProps({
  selectedElement: ElementType,
})


const [left, right] = [ref(selectedElement.get('left')), ref(selectedElement.get('right'))].sort((a, b) => a.value - b.value)
const [top, bottom] = [ref(selectedElement.get('top')), ref(selectedElement.get('bottom'))].sort((a, b) => a.value - b.value)
selectedElement.observeDeep(() => {
  const [minX, maxX] = [selectedElement.get('left'), selectedElement.get('right')].sort((a, b) => a - b)
  const [minY, maxY] = [selectedElement.get('top'), selectedElement.get('bottom')].sort((a, b) => a - b)
  left.value = minX
  right.value = maxX
  top.value = minY
  bottom.value = maxY
})
</script>

<template>
  <div
    class="selected-box"
    :style="{
      left: `${left}px`,
      top: `${top}px`,
      width: `${right - left}px`,
      height: `${bottom - top}px`,
    }">
    <div class="corner top left" :style="{ top: '-8px', left: '-8px' }"></div>
    <div class="corner top right" :style="{ top: '-8px', right: '-8px' }"></div>
    <div class="corner bottom left" :style="{ bottom: '-8px', left: '-8px' }"></div>
    <div class="corner bottom right" :style="{ bottom: '-8px', right: '-8px' }"></div>
  </div>
</template>

<style scoped lang="scss">
.selected-box {
  position: fixed;
  outline: 2px solid #4F90FF;
  cursor: move;
  .corner {
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: white;
    border: 4px solid #4F90FF;
    border-radius: 50%;
    &.top.left, &.bottom.right {
      cursor: nwse-resize;
    }
    &.top.right, &.bottom.left {
      cursor: nesw-resize;
    }
  }
}
</style>
