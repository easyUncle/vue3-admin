<template>
  <div>
    <!-- <el-tooltip :content="$t('msg.navBar.guide')"> -->
    <svg-icon icon="guide" @click="onGuidClick" id="guide-start" />
    <!-- </el-tooltip> -->
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { steps } from './step'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    // 解决嵌套在position为fixed的父节点的时候，高亮部分会被覆盖，设置animate:false可解决 https://github.com/kamranahmedse/driver.js/issues/241
    animate: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
const onGuidClick = () => {
  const stepArr = steps(i18n)
  driver.defineSteps(stepArr)
  driver.start()
}
</script>

<style lang="scss" scoped></style>
