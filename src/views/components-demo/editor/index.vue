<template>
  <div>
    <editor v-model="valueHtml"></editor>
  </div>
</template>

<script setup>
import Editor from '@/components/editor/index.vue'
import { watch, ref } from 'vue'
const valueHtml = ref('')
watch(valueHtml, newVal => {
  console.log(newVal)
})
</script>

<style lang="scss" scoped></style>
