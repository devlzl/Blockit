<script setup>
import { ElementType } from '@visual'
import { ref } from 'vue'


const { selectedElement } = defineProps({
  selectedElement: ElementType,
})
const left = ref(selectedElement.get('left'))
const right = ref(selectedElement.get('right'))
const top = ref(selectedElement.get('top'))
const bottom = ref(selectedElement.get('bottom'))
selectedElement.observeDeep(() => {
  left.value = selectedElement.get('left')
  right.value = selectedElement.get('right')
  top.value = selectedElement.get('top')
  bottom.value = selectedElement.get('bottom')
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
    <div class="corner top-left" :style="{ top: '-8px', left: '-8px' }"></div>
    <div class="corner top-right" :style="{ top: '-8px', right: '-8px' }"></div>
    <div class="corner bottom-left" :style="{ bottom: '-8px', left: '-8px' }"></div>
    <div class="corner bottom-right" :style="{ bottom: '-8px', right: '-8px' }"></div>
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
    &.top-left, &.bottom-right {
      cursor: nwse-resize;
    }
    &.top-right, &.bottom-left {
      cursor: nesw-resize;
    }
  }
}
</style>
