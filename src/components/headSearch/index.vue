<template>
  <div class="head-search" :class="{ show: isShow }">
    <svg-icon icon="search" class="search-icon" @click="toggle"></svg-icon>
    <el-select
      v-model="keyword"
      class="header-search-select"
      ref="headerSearchRef"
      placeholder="Search"
      default-first-option
      filterable
      remote
      :remote-method="remoteMethod"
      @change="selectChange"
    >
      <el-option
        v-for="item in 5"
        :label="item"
        :value="item"
        :key="item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
const isShow = ref(false)
const headerSearchRef = ref(null)
const toggle = () => {
  isShow.value = !isShow.value
  headerSearchRef.value.focus()
}
const remoteMethod = query => {
  console.log(query)
}
const selectChange = () => {
  console.log('selectChange')
}
</script>

<style lang="scss" scoped>
.head-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    transition: width 0.2s;
    display: inline-block;
    width: 0px;
    font-size: 18px;
    overflow: hidden;
    vertical-align: middle;
    background: transparent;
    :deep(.el-input__wrapper) {
      padding: 0;
      border: none;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      background-color: transparent;
      border-radius: 0;
      .el-input__inner {
        vertical-align: middle;
        &:focus {
          border: none;
        }
      }
      &.is-focus {
        box-shadow: none !important;
      }
      .el-input__suffix {
        display: none;
      }
    }
  }
  &.show {
    .header-search-select {
      width: 200px;
      margin-left: 10px;
    }
  }
}
</style>
