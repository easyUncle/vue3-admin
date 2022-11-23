<template>
  <div>
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggle"
      id="guide-full"
    ></svg-icon>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

const toggle = () => {
  screenfull.toggle()
}

onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change')
})
</script>

<style lang="scss" scoped></style>
