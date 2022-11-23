<template>
  <el-dropdown @command="selectLanguage" trigger="click">
    <span class="el-dropdown-link">
      <svg-icon icon="language" id="guide-lang"></svg-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="lang === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="lang === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const store = useStore()
const lang = computed(() => store.getters.language)
// 切换语言
const { locale } = useI18n()
const selectLanguage = lang => {
  locale.value = lang
  store.commit('app/setLanguage', lang)
}
</script>

<style lang="scss" scoped></style>
