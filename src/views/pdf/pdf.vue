<template>
  <div class="pdf-preview" @scroll="handleScroll" v-loading="loading">
    <vue-pdf-embed
      :source="pageObj.source"
      :page="pageObj.pageNum"
      :style="scaleStyle"
      ref="pdfRef"
      class="pdf-main"
      @rendered="handleDocumentRender"
    ></vue-pdf-embed>
    <div class="wrapper" v-if="!loading && !isScroll">
      <span @click="prePage">上一页</span>
      <span @click="nextPage">下一页</span>
      <span>{{ pageObj.pageNum }}/{{ pageObj.totalPage }}</span>
      <span @click="handleEnlarge">放大</span>
      <span @click="handleScaleDown">缩小</span>
    </div>
    <div class="switchBtn">
      <el-switch
        v-model="isScroll"
        class="mb-2"
        active-text="滚动模式"
        inactive-text="分页模式"
        @change="switchMode"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref, watch } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import pdfUrl from '@/assets/test.pdf'

const pageObj = reactive({
  source: pdfUrl,
  pageNum: 1,
  scale: 1,
  totalPage: 0
})

onMounted(() => {})

const scaleStyle = computed(() => `transform:scale(${pageObj.scale})`)

// method
const loading = ref(true)
const pdfRef = ref(null)
const handleDocumentRender = () => {
  loading.value = false
  pageObj.totalPage = pdfRef.value.pageCount
  console.log(pdfRef.value)
}
const prePage = function () {
  if (pageObj.pageNum <= 1) {
    return false
  }
  pageObj.pageNum -= 1
}
const nextPage = function () {
  if (pageObj.pageNum >= pageObj.totalPage) {
    return false
  }
  pageObj.pageNum += 1
}
const handleEnlarge = () => {
  if (pageObj.scale > 2) {
    return false
  }
  pageObj.scale += 0.1
}
const handleScaleDown = () => {
  if (pageObj.scale < 0.3) {
    return false
  }
  pageObj.scale -= 0.1
}
const isScroll = ref(false)
watch(isScroll, val => {
  pageObj.pageNum = val ? null : 1
})
</script>

<style lang="scss" scoped>
.pdf-preview {
  position: relative;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  background: rgb(66, 66, 66);
  overflow: scroll;
  .pdf-main {
    text-align: center;
    width: 600px;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: scroll;
  }
  .wrapper {
    height: 50px;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 400px;
    background: black;
    opacity: 0.5;
    color: #fff;
    font-size: 16px;
    left: calc(50vw - 200px + 105px);
    bottom: 20px;
    border-radius: 5px;
    span {
      cursor: pointer;
    }
  }
  .switchBtn {
    position: fixed;
    top: 150px;
    left: 230px;
    height: 30px;
    width: 200px;
    background: #ccc;
    opacity: 0.5;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
