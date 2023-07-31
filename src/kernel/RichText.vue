<script setup>
import * as Y from 'yjs'
import { Kernel } from './Kernel'
import { nextTick, onMounted, ref } from 'vue'
import RichTextElement from './components/RichTextElement.vue'
import { Block } from '@store'


const { textBlock } = defineProps({
  textBlock: Block,
})


const yDoc = new Y.Doc()
const yText = yDoc.getText()
const kernel = new Kernel(yText)
const kernelRef = ref(null)
onMounted(() => {
  kernel.mount(kernelRef.value)
  const text = textBlock.props.text
  kernel.setKernelRange({
    index: kernel.getKernelRange().index + text.length,
    length: 0,
  })
  kernel.insertText(text, {}, { index: 0, length: 0 })
})


const deltas = ref([])
kernel.events.deltaUpdate.on(async () => {
  deltas.value = kernel.getDeltas()
  await nextTick()
  const kernelRange = kernel.getKernelRange()
  const range = kernel.toRange(kernelRange)
  kernel.setRange(range)
})


kernel.events.selectionChange.on(() => {
  textBlock.page.setSelectedKernels(kernel)
})
</script>

<template>
  <div class="rich-text" ref="kernelRef" style="white-space: break-spaces;">
    <RichTextElement v-for="delta of deltas" :delta="delta" />
  </div>
</template>
