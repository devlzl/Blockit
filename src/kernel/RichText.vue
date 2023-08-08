<script setup>
import { Kernel } from './Kernel'
import { nextTick, onMounted, ref } from 'vue'
import RichTextElement from './components/RichTextElement.vue'
import { Page, BlockType } from '@store'


const { page, textBlock, initFocus } = defineProps({
  page: Page,
  textBlock: BlockType,
  initFocus: String,
})

const yText = textBlock.get('props').get('text')
const kernel = new Kernel(yText)
const kernelRef = ref(null)
onMounted(() => {
  kernel.mount(kernelRef.value)
  const text = yText.toString()
  if (initFocus === 'start') {
    kernel.setKernelRange({ index: 0, length: 0 })
  } else if (initFocus === 'end') {
    kernel.setKernelRange({
      index: kernel.getKernelRange().index + text.length,
      length: 0,
    })
  }
})


const deltas = ref([])
kernel.events.deltaUpdate.on(async () => {
  deltas.value = kernel.getDeltas()
  await nextTick()
  const kernelRange = kernel.getKernelRange()
  const range = kernel.toRange(kernelRange)
  kernel.setRange(range)
  page.events.deltaUpdate.emit()
})


kernel.events.selectionChange.on(() => {
  page.events.selectionChange.emit(kernel)
})


kernel.events.lineBreak.on((data) => {
  page.events.lineBreak.emit({
    blockId: textBlock.get('id'),
    data: data,
  })
})
</script>

<template>
  <div class="rich-text" ref="kernelRef" style="white-space: break-spaces;">
    <RichTextElement v-for="delta of deltas" :delta="delta" />
  </div>
</template>
