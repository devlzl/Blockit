<script setup>
import { ref, nextTick } from 'vue'


const { pageBlock } = defineProps({
  pageBlock: Object,
})


async function handleFormat(attributeName) {
  const kernels = Array.from(pageBlock.page.getSelectedKernels())
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
const delActive = ref(false)
const codeActive = ref(false)
function handleActiveChange() {
  const kernelRange = kernel.getKernelRange()
  const deltas = kernel.getDeltasByKernelRange(kernelRange)
  boldActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.bold)
  italicActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.italic)
  underlineActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.underline)
  delActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.del)
  codeActive.value = deltas.length > 0 && deltas.every(delta => delta.attributes?.code)
}
// kernel.events.deltaUpdate.on(handleActiveChange)
// kernel.events.selectionChange.on(handleActiveChange)


function addTextBlock() {
  const note = pageBlock.children[0]
  pageBlock.page.addBlock('text', { text: 'new text block' + String(Math.random()).slice(2,3) }, note)
}
</script>

<template>
  <div class="toolbar">
    <el-button class="bold" :type="boldActive ? 'primary' : ''" @click="handleFormat('bold')">bold</el-button>
    <el-button class="italic" :type="italicActive ? 'primary' : ''" @click="handleFormat('italic')">italic</el-button>
    <el-button class="underline" :type="underlineActive ? 'primary' : ''" @click="handleFormat('underline')">underline</el-button>
    <el-button class="del" :type="delActive ? 'primary' : ''" @click="handleFormat('del')">del</el-button>
    <el-button class="code" :type="codeActive ? 'primary' : ''" @click="handleFormat('code')">code</el-button>
    <br>
    <el-button @click="addTextBlock">Add Text Block</el-button>
  </div>
</template>
