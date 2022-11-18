<template>
  <el-dropdown trigger="click" @command="selectTheme" v-bind="$attrs">
    <span class="el-dropdown-link">
      <svg-icon icon="change-theme"></svg-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{ $t('msg.theme.themeChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="visiable"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor'
const visiable = ref(false)
const selectTheme = () => {
  visiable.value = true
}
</script>

<style lang="sass" scoped></style>
