<script setup>
import { Kernel } from './Kernel'
import { nextTick, onMounted, ref } from 'vue'
import RichTextElement from './components/RichTextElement.vue'


const { kernel } = defineProps({
  kernel: Kernel,
})


const kernelRef = ref(null)
onMounted(() => {
  kernel.mount(kernelRef.value)
})


const deltas = ref([])
kernel.events.deltaUpdate.on(async () => {
  deltas.value = kernel.getDeltas()
  await nextTick()
  const kernelRange = kernel.getKernelRange()
  const range = kernel.toRange(kernelRange)
  kernel.setRange(range)
})
</script>

<template>
  <div class="rich-text" ref="kernelRef" style="white-space: break-spaces;">
    <RichTextElement v-for="delta of deltas" :delta="delta" />
  </div>
</template>
