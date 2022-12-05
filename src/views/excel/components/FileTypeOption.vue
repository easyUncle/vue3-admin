<template>
  <div :style="{ display: 'inline-block' }">
    <label class="radio-label">Booktype: </label>
    <el-select v-model="fileType" placeholder="Select" size="large">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { defineProps, defineEmits } from 'vue'
const options = ['xlsx', 'csv', 'txt']
const props = defineProps({
  modelValue: {
    type: String,
    default: 'xlsx'
  }
})
const emits = defineEmits(['update:modelValue'])
const fileType = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    console.log(newVal)
    emits('update:modelValue', newVal)
  }
})
</script>

<style lang="scss" scoped></style>
