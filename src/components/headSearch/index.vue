<template>
  <div id="head-search" :class="{ show: isShow }">
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
        v-for="option in searchOptions"
        :label="option.item.title.join('>')"
        :value="option.item.path"
        :key="option.item.path"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import { generateSearchPool } from './useFuse.js'
import { useRouter } from 'vue-router'
import { filterRoutes, generateRoutes } from '@/utils/route.js'

const keyword = ref('')
const isShow = ref(false)
const headerSearchRef = ref(null)

const toggle = () => {
  isShow.value = !isShow.value
  headerSearchRef.value.focus()
}

// 模糊搜索
const router = useRouter()
const searchPool = computed(() =>
  generateSearchPool(generateRoutes(filterRoutes(router.getRoutes())))
)
const fuse = new Fuse(searchPool.value, {
  minMatchCharLength: 1,
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})
const searchOptions = ref([])
const remoteMethod = query => {
  searchOptions.value = fuse.search(query)
}
// 跳转路由
const selectChange = path => {
  router.push({ path })
}
</script>

<style lang="scss" scoped>
#head-search {
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
      border-bottom: 1px solid #d9d9d9;
      background-color: transparent;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0;
      .el-input__inner {
        vertical-align: middle;
      }
      &.is-focus {
        box-shadow: none !important;
        border: none !important;
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
