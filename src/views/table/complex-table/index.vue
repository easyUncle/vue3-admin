<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        class="filter-item"
        style="width: 200px"
        placeholder="标题"
        size="large"
      ></el-input>
      <el-select
        class="filter-item"
        v-model="listQuery.importance"
        placeholder="重要性"
        size="large"
        style="width: 120px"
        clearable
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="类型"
        class="filter-item"
        style="width: 120px"
        size="large"
        clearable
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        class="filter-item"
        style="width: 160px"
        size="large"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        type="primary"
        :icon="Search"
        class="filter-item"
        size="large"
        @click="handleFilter"
        >搜索</el-button
      >
      <el-button
        type="primary"
        :icon="EditPen"
        class="filter-item"
        size="large"
        @click="showCreateDialog = true"
        >添加</el-button
      >
      <el-button
        type="primary"
        :icon="Download"
        class="filter-item"
        size="large"
        @click="handleDownload"
        >导出</el-button
      >
      <el-checkbox v-model="showReviewer" style="margin-left: 10px">
        审核
      </el-checkbox>
    </div>
    <el-table
      :data="tableData"
      highlight-current-row
      border
      row-key="id"
      style="width: 100%"
      @sort-change="sortChange"
      v-loading="tableLoading"
    >
      <el-table-column
        label="序号"
        sortable="custom"
        prop="id"
        align="cneter"
        width="60"
        :class-name="getClassName()"
      >
      </el-table-column>
      <el-table-column label="时间" prop="timestamp" align="center" width="150">
        <template v-slot="{ row }">
          {{ $filters.dateFilter(row.timestamp, 'YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title" min-width="150px">
        <template v-slot="{ row }">
          <span
            class="link-type"
            @click="
              () => {
                showEditDialog = true
                defaultForm = Object.assign({}, row)
              }
            "
            >{{ row.title }}</span
          >
          <el-tag size="small">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="author" align="center" width="100">
      </el-table-column>
      <el-table-column
        label="阅读量"
        prop="pageviews"
        align="center"
        width="100"
      >
        <template v-slot="{ row }">
          {{ row.pageviews || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="重要性" prop="importance" width="80px">
        <template v-slot="{ row }">
          <svg-icon
            icon="star"
            v-for="item in row.importance"
            :key="item"
          ></svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" width="100px" align="center">
        <template v-slot="{ row }">
          <el-tag :type="getTagType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="审核人"
        prop="reviewer"
        align="center"
        width="100"
        v-if="showReviewer"
      >
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template v-slot="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            @click="
              () => {
                showEditDialog = true
                defaultForm = Object.assign({}, row)
              }
            "
            >编辑</el-button
          >
          <el-button
            size="small"
            v-if="row.status !== 'draft'"
            @click="handleModifyStatus(row, 'draft')"
            >草稿</el-button
          >
          <el-button
            type="success"
            size="small"
            v-if="row.status !== 'published'"
            @click="handleModifyStatus(row, 'published')"
            >发布</el-button
          >
          <el-button
            type="warning"
            size="small"
            v-if="row.status !== 'deleted'"
            @click="handleDelete(row, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="totalCount"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @update-page="getTableList"
      :background="true"
    ></pagination>
    <Dialog
      title="创建"
      v-model="showCreateDialog"
      @submit="createRow"
    ></Dialog>
    <Dialog
      title="编辑"
      v-model="showEditDialog"
      :defaultForm="defaultForm"
      @submit="updateRow"
    ></Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EditPen, Search, Download } from '@element-plus/icons-vue'
import { fetchList, createArticle, updateArticle } from '@/api/article.js'
import Pagination from '@/components/pagination/index.vue'
import Dialog from './components/Dialog.vue'
import { ElNotification, ElMessage } from 'element-plus'
const TAG_MAP = {
  published: 'success',
  draft: 'info',
  deleted: 'danger'
}

const listQuery = ref({
  page: 1,
  limit: 10,
  importance: undefined,
  title: undefined,
  type: undefined,
  sort: '+id'
})
const importanceOptions = [1, 2, 3]
const typeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
const sortOptions = [
  { label: 'ID Ascending', key: '+id' },
  { label: 'ID Descending', key: '-id' }
]
const showReviewer = ref(false)

/**
 * 获取表格数据
 */
const tableData = ref([])
const tableLoading = ref(false)
const totalCount = ref(0)
const getTableList = async () => {
  tableData.value = []
  tableLoading.value = true
  const { items, total } = await fetchList(listQuery.value)
  totalCount.value = total
  tableData.value = items
  setTimeout(() => {
    tableLoading.value = false
  }, 500)
}
getTableList()
/**
 * 获取标签类型
 */
const getTagType = type => {
  return TAG_MAP[type] || 'primary'
}
/**
 * 排序
 */
const sortChange = data => {
  const { prop, order } = data
  if (prop === 'id') {
    sortByID(order)
  }
}
const sortByID = order => {
  if (order === 'ascending') {
    listQuery.value.sort = '+id'
  } else {
    listQuery.value.sort = '-id'
  }
  handleFilter()
}
const getClassName = () => {
  return listQuery.value.sort === '+id' ? 'ascending' : 'descending'
}
const handleFilter = () => {
  listQuery.value.page = 1
  getTableList()
}
/**
 * 添加行
 */
const showCreateDialog = ref(false)
const createRow = async row => {
  row.timestamp = new Date(row.timestamp)
  row.author = 'EsunLee'
  row.id = parseInt(Math.random() * 1000) + 1024
  await createArticle(row)
  tableData.value.unshift(row)
  ElNotification({
    title: '成功',
    message: '创建成功',
    type: 'success'
  })
}
/**
 * 导出表格
 */
const handleDownload = async () => {
  const excel = await import('@/vendor/Export2Excel.js')
  const tHeader = ['序号', '时间', '标题', '作者', '重要性', '阅读量', '状态']
  const filterVal = [
    'id',
    'display_time',
    'title',
    'author',
    'importance',
    'pageviews',
    'status'
  ]
  //转变为二维数组
  const data = filterData(tableData.value, filterVal)
  excel.export_json_to_excel({
    header: tHeader, //表头 必填
    data, //具体数据 必填
    filename: '文章汇总' //非必填
  })
}
const filterData = (rawData, filterVal) => {
  console.log(filterVal)
  return rawData.map(obj => {
    const row = []
    filterVal.forEach(key => {
      if (obj[key]) {
        row.push(obj[key])
      } else {
        row.push('')
      }
    })
    return row
  })
}
/**
 * 更新行
 */
const defaultForm = ref(null)
const showEditDialog = ref(false)
const updateRow = async newRow => {
  const tempData = Object.assign({}, newRow)
  tempData.timestamp = new Date(newRow.timestamp)
  await updateArticle(tempData)
  const index = tableData.value.findIndex(v => v.id === tempData.id)
  tableData.value.splice(index, 1, tempData)
  ElNotification({
    title: '成功',
    message: '更新成功',
    type: 'success'
  })
}
/**
 * 更新状态
 */
const handleModifyStatus = (row, status) => {
  row.status = status
  ElMessage({
    message: '操作成功',
    type: 'success'
  })
}
/**
 * 删除操作
 */
const handleDelete = (row, index) => {
  console.log(index)
  tableData.value.splice(index, 1)
  ElMessage({
    message: '操作成功',
    type: 'success'
  })
}
</script>

<style lang="scss" scoped></style>
