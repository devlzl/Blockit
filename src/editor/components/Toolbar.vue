<script setup>
import { Kernel } from '@kernel/Kernel'


const { kernel } = defineProps({
  kernel: Kernel,
})

function toggleStyle(attributeName) {
  const kernelRange = kernel.getKernelRange()
  const deltas = kernel.getDeltasByKernalRange(kernelRange)
  const formatted = deltas.every(delta => delta.attributes?.[attributeName])
  kernel.formatText(kernelRange, {
    [attributeName]: !formatted,
  })
}
</script>

<template>
  <div class="toolbar">
    <el-button class="bold" @click="toggleStyle('bold')">bold</el-button>
    <el-button class="italic" @click="toggleStyle('italic')">italic</el-button>
    <el-button class="underline" @click="toggleStyle('underline')">underline</el-button>
    <el-button class="del" @click="toggleStyle('del')">del</el-button>
    <el-button class="code" @click="toggleStyle('code')">code</el-button>
  </div>
</template>
