<template>
  <div>
    <el-scrollbar class="scroll-container" :native="false" ref="scrollRef">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { defineExpose, nextTick, ref } from 'vue'
const scrollRef = ref(null)
const TAG_MARGIN = 4
const scrollToTarget = async (tag, tagList) => {
  await nextTick()
  console.log(scrollRef.value)
  const $container = scrollRef.value.$el
  const $scrollWrap = scrollRef.value.wrapRef
  const scrollRefVal = scrollRef.value

  const currentIndex = tagList.findIndex(item => item === tag)

  if (currentIndex === 0) {
    scrollRefVal.scrollTo(0, 0)
  } else if (currentIndex === tagList.length - 1) {
    scrollRefVal.scrollTo($scrollWrap.scrollWidth - $container.offsetWidth, 0)
  } else {
    const preTag = tagList[currentIndex - 1]
    console.log(preTag.$el.offsetLeft)
    const nextTag = tagList[currentIndex + 1]

    const nextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + TAG_MARGIN

    const preTagOffsetLeft = preTag.$el.offsetLeft - TAG_MARGIN

    if (nextTagOffsetLeft > $scrollWrap.scrollLeft + $container.offsetWidth) {
      scrollRefVal.scrollTo(nextTagOffsetLeft - $container.offsetWidth, 0)
    } else if (preTagOffsetLeft < $scrollWrap.scrollLeft) {
      scrollRefVal.scrollTo(preTagOffsetLeft, 0)
    }
  }
}
defineExpose({
  scrollToTarget
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
  }
}
</style>
