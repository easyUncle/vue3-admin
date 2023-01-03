<template>
  <div class="pagination-container">
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      :background="background"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50]
  },
  background: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  }
})
const emits = defineEmits(['update:limit', 'update:page', 'update-page'])
/**
 * 改变每页条数
 */
const handleSizeChange = everypageCount => {
  emits('update:limit', everypageCount)
  emits('update-page')
}
/**
 * 改变页码
 */
const handleCurrentChange = page => {
  emits('update:page', page)
  emits('update-page')
}
</script>

<style lang="scss" scoped>
.pagination-container {
  margin-top: 20px;
}
</style>
