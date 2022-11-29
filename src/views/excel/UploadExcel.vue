<template>
  <div>
    <upload-excel :onSuccess="onSuccess"></upload-excel>
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script setup>
import UploadExcel from '@/components/uploadExcel/'
import { ref } from 'vue'
const tableData = ref([])
const tableHeader = ref([])
const onSuccess = data => {
  const { header, worksheet } = data
  tableData.value = worksheet
  tableHeader.value = header.filter(item => !item.includes('UNKNOW'))
}
</script>

<style lang="scss" scoped></style>
