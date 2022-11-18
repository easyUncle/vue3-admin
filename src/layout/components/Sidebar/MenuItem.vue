<template>
  <div v-if="icon && icon.includes('el-icon')" class="svg-wrapper">
    <el-icon size="14"> <component :is="icon.split('-')[2]" /></el-icon>
  </div>
  <div v-else class="svg-wrapper">
    <svg-icon :icon="icon"></svg-icon>
  </div>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { generateTitle } from '@/utils/i18n.js'
import { defineProps } from 'vue'
defineProps({
  icon: {
    type: String,
    required: true,
    default: ''
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.svg-wrapper {
  display: inline-block;
  width: 30px;
  vertical-align: middle;
  text-align: center;
}
</style>
