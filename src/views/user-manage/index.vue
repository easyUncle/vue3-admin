<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="formData">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="国家地区：" :style="{ width: '300px' }">
            <el-input v-model="formData.region" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="formData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" fit>
      <el-table-column prop="country" label="国家" />
      <el-table-column prop="date" label="日期" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const formData = ref({
  region: '',
  date: ''
})
const tableData = ref([
  {
    country: '中国',
    date: '20222.12.12'
  },
  {
    country: '中国',
    date: '20222.12.12'
  },
  {
    country: '中国',
    date: '20222.12.12'
  },
  {
    country: '中国',
    date: '20222.12.12'
  }
])
const handleDelete = (index, row) => {
  console.log(index, row)
}
</script>

<style lang="scss" scoped></style>
