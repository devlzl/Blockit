<script setup>
const { delta } = defineProps({
  delta: Object,
})
</script>

<template>
  <span class="rich-text-element" :class="{
    bold: delta.attributes?.bold,
    italic: delta.attributes?.italic,
    underline: delta.attributes?.underline,
    strike: delta.attributes?.strike,
    code: delta.attributes?.code,
  }">
    {{ delta.insert }}
  </span>
</template>

<style scoped>
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
.code {
  background-color: lightgray;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 90%;
}
</style>
