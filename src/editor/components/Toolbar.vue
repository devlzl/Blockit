<script setup>
import { Kernel } from '@kernel/Kernel'
import { ref } from 'vue'


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


const boldActive = ref(false)
const italicActive = ref(false)
const underlineActive = ref(false)
const delActive = ref(false)
const codeActive = ref(false)
function handleActiveChange() {
  const kernelRange = kernel.getKernelRange()
  const deltas = kernel.getDeltasByKernalRange(kernelRange)
  boldActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.bold)
  italicActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.italic)
  underlineActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.underline)
  delActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.del)
  codeActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.code)
}
kernel.events.deltaUpdate.on(handleActiveChange)
kernel.events.selectionChange.on(handleActiveChange)
</script>

<template>
  <div class="toolbar">
    <el-button class="bold" :type="boldActive ? 'primary' : ''" @click="toggleStyle('bold')">bold</el-button>
    <el-button class="italic" :type="italicActive ? 'primary' : ''" @click="toggleStyle('italic')">italic</el-button>
    <el-button class="underline" :type="underlineActive ? 'primary' : ''" @click="toggleStyle('underline')">underline</el-button>
    <el-button class="del" :type="delActive ? 'primary' : ''" @click="toggleStyle('del')">del</el-button>
    <el-button class="code" :type="codeActive ? 'primary' : ''" @click="toggleStyle('code')">code</el-button>
  </div>
</template>
