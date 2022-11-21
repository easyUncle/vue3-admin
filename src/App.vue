<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { generateNewStyle, writeNewStyle } from './utils/theme'
const store = useStore()
const locale = computed(() => (store.getters.language === 'en' ? en : zhCn))
// 获取主色，主题颜色初始化
generateNewStyle(store.getters.mainColor).then(styleText => {
  writeNewStyle(styleText)
})
</script>

<style>
/* .el-input__wrapper {
  --el-select-input-focus-border-color: none !important;
} */
</style>
