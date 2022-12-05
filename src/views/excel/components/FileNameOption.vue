<template>
  <div style="display: inline-block">
    <label class="radio-label">Filename: </label>
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width: 345px"
      :prefix-icon="Document"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { Document } from '@element-plus/icons-vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: 'excel-list'
  }
})
const emits = defineEmits(['update:modelValue'])
const filename = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emits('update:modelValue', newVal)
  }
})
</script>

<style lang="scss" scoped></style>
