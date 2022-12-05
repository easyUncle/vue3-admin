<template>
  <div :style="{ display: 'inline-block' }">
    <label class="radio-label">Cell Auto-Width: </label>
    <el-switch v-model="autoWidth" active-text="Open" inactive-text="Close" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:modelValue'])
const autoWidth = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emits('update:modelValue', newVal)
  }
})
</script>

<style lang="scss" scoped></style>
