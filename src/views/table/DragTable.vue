<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      ref="tableRef"
      row-key="id"
      highlight-current-row
    >
      <el-table-column prop="id" align="center" label="ID" width="60" />
      <el-table-column prop="timestamp" align="center" label="Date" width="180">
        <template v-slot="{ row }">
          {{ $filters.dateFilter(row.timestamp, 'YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        min-width="300px"
        label="Title"
      />
      <el-table-column prop="author" align="center" label="Author" />
      <el-table-column prop="importance" label="importance">
        <template v-slot="{ row }">
          <svg-icon
            v-for="item in row.importance"
            :key="item"
            icon="star"
          ></svg-icon>
        </template>
      </el-table-column>
      <el-table-column prop="pageviews" align="center" label="Reading" />
      <el-table-column prop="status" align="center" label="Status"
        ><template v-slot="{ row }">
          <el-tag :type="tagFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Drag" align="center">
        <template #default>
          <svg-icon class="drag-handler" icon="drag" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { fetchList } from '@/api/article.js'
import { onMounted, ref } from 'vue'
import Sortable from 'sortablejs'
const tagMap = {
  published: 'success',
  draft: 'info',
  deleted: 'danger'
}
const tableData = ref([])
const getTableList = async () => {
  const { items } = await fetchList()
  tableData.value = items
}
getTableList()

/**
 * 标签map
 */
const tagFilter = type => {
  return tagMap[type]
}
/**
 * 初始化Sortable，创建实例对象
 */
const tableRef = ref(null)
const isUpdate = ref(false)
const initSortable = () => {
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper table  tbody'
  )[0]
  Sortable.create(el, {
    ghostClass: 'sortable-ghost',
    setData: dataTransfer => {
      // fixed Fox bug https://github.com/SortableJS/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    onEnd: event => {
      const { newIndex, oldIndex } = event
      const tableDataVal = tableData.value
      const targetRow = tableDataVal.splice(oldIndex, 1)[0]
      tableDataVal.splice(newIndex, 0, targetRow)
    }
  })
}
onMounted(() => {
  initSortable()
})
</script>

<style lang="scss" scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
