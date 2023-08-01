<script setup>
import { ref, nextTick } from 'vue'
import { Page } from '@store'


const { page } = defineProps({
  page: Page,
})


async function handleFormat(attributeName) {
  const kernels = Array.from(page.getSelectedKernels())
  kernels.forEach(kernel => kernel.toggleSelectedFormat(attributeName))
  // restore native selection, because they were deleted by `setRange`
  await nextTick()
  const startKernel = kernels.reduce((previous, current) => {
    return previous.rootElement.compareDocumentPosition(current.rootElement) === Node.DOCUMENT_POSITION_FOLLOWING ? previous : current
  })
  const endKernel = kernels.reduce((previous, current) => {
    return previous.rootElement.compareDocumentPosition(current.rootElement) === Node.DOCUMENT_POSITION_PRECEDING ? previous : current
  })
  const selection = window.getSelection()
  if (selection.rangeCount) {
    const currentRange = selection.getRangeAt(0)
    selection.removeRange(currentRange)
  }
  const range = new Range()
  const startRange = startKernel.toRange(startKernel.getKernelRange())
  const endRange = endKernel.toRange(endKernel.getKernelRange())
  range.setStart(startRange.startContainer, startRange.startOffset)
  range.setEnd(endRange.endContainer, endRange.endOffset)
  selection.addRange(range)
}


const boldActive = ref(false)
const italicActive = ref(false)
const underlineActive = ref(false)
const strikeActive = ref(false)
const codeActive = ref(false)
function handleActiveChange() {
  function checkDeltas(kernel, attributeName) {
    const kernelRange = kernel.getKernelRange()
    const deltas = kernel.getDeltasByKernelRange(kernelRange)
    return deltas.length > 0 && deltas.every(delta => delta.attributes?.[attributeName])
  }
  const kernels = Array.from(page.getSelectedKernels())
  boldActive.value = kernels.length > 0 && kernels.every(kernel => checkDeltas(kernel, 'bold'))
  italicActive.value = kernels.length > 0 && kernels.every(kernel => checkDeltas(kernel, 'italic'))
  underlineActive.value = kernels.length > 0 && kernels.every(kernel => checkDeltas(kernel, 'underline'))
  strikeActive.value = kernels.length > 0 && kernels.every(kernel => checkDeltas(kernel, 'strike'))
  codeActive.value = kernels.length > 0 && kernels.every(kernel => checkDeltas(kernel, 'code'))
}
page.events.deltaUpdate.on(handleActiveChange)
page.events.selectionChange.on(handleActiveChange)
</script>

<template>
  <div class="format-bar">
    <el-button class="format-button bold" :type="boldActive ? 'primary' : ''" @click="handleFormat('bold')">B</el-button>
    <el-button class="format-button italic" :type="italicActive ? 'primary' : ''" @click="handleFormat('italic')">I</el-button>
    <el-button class="format-button underline" :type="underlineActive ? 'primary' : ''" @click="handleFormat('underline')">U</el-button>
    <el-button class="format-button strike" :type="strikeActive ? 'primary' : ''" @click="handleFormat('strike')">S</el-button>
    <el-button class="format-button code" :type="codeActive ? 'primary' : ''" @click="handleFormat('code')">&lt;&gt;</el-button>
  </div>
</template>

<style scoped lang="scss">
.format-bar {
  background-color: white;
  padding: 10px;
  box-shadow: 1px 1px 5px lightgray;
  border-radius: 7px;
}
.format-button  {
  width: 30px;
  border-style: dashed;
}
.format-button + .format-button {
  margin-left: 10px;
}
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}
.underline {
  text-decoration: underline;
}
.strike {
  text-decoration: line-through;
}
</style>
