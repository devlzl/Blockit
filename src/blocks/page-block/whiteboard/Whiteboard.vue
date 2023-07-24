<script setup>
import { onMounted, ref } from 'vue'
import { drawRect } from '@renderer/shapes/rect'

const canvasRef = ref(null)
onMounted(() => {
  const context = canvasRef.value.getContext('2d')
  drawRect(context, 10, 10, 100, 70)
})
</script>

<template>
  <div mode="whiteboard">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
</style>
