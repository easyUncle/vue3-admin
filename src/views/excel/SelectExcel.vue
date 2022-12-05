<template>
  <div id="selectExcel">
    <el-card class="header">
      <file-name-option
        v-model="filename"
        class="header-item"
      ></file-name-option>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
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
import FileNameOption from './components/FileNameOption.vue'
import { fetchList } from '@/api/article'
import { ref } from 'vue'
const filename = ref('')
const listLoading = ref(false)
const list = ref([])
const selectList = ref([])
const downloadLoading = ref(false)
/**
 * 获取表格数据
 */
const fetchData = async () => {
  listLoading.value = true
  const { items } = await fetchList()
  list.value = items
  listLoading.value = false
}
fetchData()
const handleSelectionChange = val => {
  selectList.value = val.length > 0 ? val : list.value
}
/**
 * 下载excel表格
 */
const handleDownload = async () => {
  downloadLoading.value = true
  const excel = await import('@/vendor/Export2Excel.js')
  const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
  const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
  const data = formatJson(selectList.value, filterVal)
  console.log(data.length)
  if (data.length < 1) {
    return false
  }
  excel.export_json_to_excel({
    header: tHeader, //表头 必填
    data, //具体数据 必填
    filename: filename.value, //非必填
    autoWidth: true, //非必填
    bookType: 'xlsx' //非必填
  })
  downloadLoading.value = false
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
#selectExcel {
  :deep(.header) {
    margin-bottom: 20px;
    .header-item {
      padding-left: 30px;
    }
  }
}
</style>
