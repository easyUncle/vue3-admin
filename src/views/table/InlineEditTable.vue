<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      row-key="id"
      highlight-current-row
    >
      <el-table-column prop="id" label="ID" width="60" align="center" />
      <el-table-column prop="timestamp" label="Date" width="180" align="center">
        <template v-slot="{ row }">
          {{ $filters.dateFilter(row.timestamp, 'YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column prop="author" label="Author" align="center" />
      <el-table-column prop="importance" label="Importance">
        <template v-slot="{ row }">
          <svg-icon
            icon="star"
            v-for="star in row.importance"
            :key="star"
          ></svg-icon>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" align="center">
        <template v-slot="{ row }">
          <el-tag :type="getTagType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" width="400">
        <template v-slot="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              type="warning"
              @click="cancelEdit(row)"
            >
              <el-icon><Refresh /></el-icon> 取消
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" v-if="!row.edit" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button type="success" v-else @click="confirmEdit(row)"
            >确认</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { fetchList } from '@/api/article'
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

//常量
const TAG_MAP = {
  published: 'success',
  draft: 'info',
  deleted: 'danger'
}
const tableData = ref([])
const getTableData = async () => {
  const { items } = await fetchList()
  tableData.value = items
}
getTableData()
/**
 * 定义tag类型
 */
const getTagType = type => {
  return TAG_MAP[type] || 'primary'
}
/**
 * 取消编辑
 */
const cancelEdit = row => {
  row.edit = false
  row.title = row.originTitle
}
/**
 * 确认编辑
 */
const confirmEdit = row => {
  row.edit = false
}
/**
 * 点击编辑按钮
 */
const handleEdit = row => {
  row.edit = true
  row.originTitle = row.title
}
</script>

<style lang="scss" scoped>
.edit-input {
  width: 300px;
  height: 30px;
  font-size: 14px;
}
.cancel-btn {
  height: 30px;
  margin-left: 10px;
}
</style>
