<template>
  <div id="exportExcel">
    <el-card class="header">
      <file-name-option
        v-model="filename"
        class="header-item"
      ></file-name-option>
      <auto-width-option
        v-model="autoWidth"
        class="header-item"
      ></auto-width-option>
      <file-type-option
        v-model="fileType"
        class="header-item"
      ></file-type-option>
      <el-button
        :loading="downloadLoading"
        style="margin: 20px 0 20px 20px"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >
        Export Excel
      </el-button>
    </el-card>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading..."
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="Id" width="95" type="index">
        </el-table-column>
        <el-table-column label="Title">
          <template v-slot="{ row }">
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author" width="110" align="center">
          <template v-slot="{ row }">
            <el-tag>{{ row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Readings" width="115" align="center">
          <template v-slot="{ row }">
            {{ row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Date" width="220">
          <template v-slot="{ row }">
            <i class="el-icon-time" />
            <span>{{
              $filters.dateFilter(row.timestamp, 'YYYY-MM-DD HH:mm:ss')
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileNameOption from './components/FileNameOption.vue'
import AutoWidthOption from './components/AutoWidthOption.vue'
import FileTypeOption from './components/FileTypeOption.vue'
import { fetchList } from '@/api/article'
const filename = ref('')
const autoWidth = ref(true)
const fileType = ref('')
const listLoading = ref(false)
const list = ref([])
const downloadLoading = ref(false)
/**
 * 获取表格数据
 */
const fetchData = async () => {
  listLoading.value = true
  const { total, items } = await fetchList()
  console.log(items)
  list.value = items
  listLoading.value = false
}
fetchData()
/**
 * 下载excel表格
 */
const handleDownload = async () => {
  const excel = await import('@/vendor/Export2Excel.js')
  const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
  const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
  const data = formatJson(list.value, filterVal)
  console.log(data)
  excel.export_json_to_excel({
    header: tHeader, //表头 必填
    data, //具体数据 必填
    filename: filename.value, //非必填
    autoWidth: autoWidth.value, //非必填
    bookType: fileType.value //非必填
  })
}
/**
 * 格式化导出的json,为二维数组
 */
const formatJson = (rawData, filterVal) => {
  return rawData.map(item => {
    const row = []
    filterVal.forEach(key => {
      if (item[key]) {
        row.push(item[key])
      } else {
        row.push('')
      }
    })
    return row
  })
}
</script>

<style lang="scss" scoped>
#exportExcel {
  :deep(.header) {
    margin-bottom: 20px;
    .header-item {
      padding-left: 30px;
    }
  }
}
</style>
