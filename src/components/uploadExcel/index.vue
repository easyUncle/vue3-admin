<template>
  <div>
    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      {{ $t('msg.uploadExcel.drop') }}
      <el-button
        :loading="loading"
        style="margin-left: 16px"
        size="small"
        type="primary"
        @click="handleUpload"
      >
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import * as XLSX from 'xlsx'
import { getHeaderRow, isExcel } from '@/utils/excel.js'
import { ElMessage } from 'element-plus'
const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})
const loading = ref(false)
const excelUploadInput = ref(null)
const handleChange = e => {
  const fileList = e.target.files
  const rawFile = fileList && fileList[0]
  if (!rawFile) {
    return
  }
  upload(rawFile)
}
/**
 *  上传文件
 */
const upload = rawFile => {
  const { beforeUpload } = props
  // 如果没有上传前的回调方法，直接读取文件
  if (!beforeUpload) {
    readData(rawFile)
    return
  }
  // 如果有上传前的回调方法，执行回调，只有方法的返回的结果为true,读取数据
  const before = beforeUpload()
  if (before) {
    readData(rawFile)
  }
}
/**
 * 被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发
 */
const handleDrop = e => {
  if (loading.value) {
    return
  }
  const fileList = e.dataTransfer.files
  if (fileList.length < 1) {
    ElMessage.error('文件不能为空！！！')
    return
  }
  const rawFile = fileList[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  upload(rawFile)
}
/**
 * 拖拽悬停时触发
 */
const handleDragover = e => {
  e.dataTransfer.dropEffect = 'copy'
}
/**
 * 读取数据(异步)
 */
const readData = file => {
  loading.value = true
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => {
      // 1.获取表格数据
      const result = e.target.result
      // 2.解析表格数据
      const workbook = XLSX.read(result, { type: 'array' })
      console.log(workbook)
      // 3.获取第一个sheet的名称
      const firstSheetName = workbook.SheetNames[0]
      // 4.获取第一个sheet的数据
      const firstSheet = workbook.Sheets[firstSheetName]
      // 5.获取表头
      const header = getHeaderRow(firstSheet)
      // 6.sheet数据转化成json
      const worksheet = XLSX.utils.sheet_to_json(firstSheet)
      // 7.生成数据
      generateData({ header, worksheet })
      resolve()
    }
    // 启动读取数据
    reader.readAsArrayBuffer(file)
  })
}
/**
 * 生成数据
 */
const generateData = data => {
  const { onSuccess } = props
  onSuccess && onSuccess(data)
  loading.value = false
}
const handleUpload = () => {
  excelUploadInput.value.click()
}
</script>

<style lang="scss" scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
