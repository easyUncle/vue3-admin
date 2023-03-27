<template>
  <div class="pdf-preview" @scroll="handleScroll">
    <vue-pdf-embed
      :source="pageObj.source"
      :page="pageObj.pageNum"
      :style="scaleStyle"
      class="pdf-main"
      v-show="flag"
    />
    <vue-pdf-embed
      :source="pageObj.source"
      :page="pageObj.pageNum"
      :style="scaleStyle"
      class="pdf-main"
      v-show="!flag"
    />
    <div class="wrapper">
      <span @click="prePage">上一页</span>
      <span @click="nextPage">下一页</span>
      <span>{{ pageObj.pageNum }}/{{ pageObj.totalPage }}</span>
      <span @click="handleEnlarge">放大</span>
      <span @click="handleScaleDown">缩小</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref } from 'vue'
import { createLoadingTask } from 'vue3-pdfjs/esm'
import VuePdfEmbed from 'vue-pdf-embed'
import pdfUrl from '@/assets/test.pdf'

const pageObj = reactive({
  source: pdfUrl,
  pageNum: 1,
  scale: 1,
  totalPage: 0
})

onMounted(() => {
  const loadingTask = createLoadingTask(pdfUrl)
  loadingTask.promise.then(pdf => {
    pageObj.totalPage = pdf.numPages
  })
})

const scaleStyle = computed(() => `transform:scale(${pageObj.scale})`)

// method
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

const flag = ref(true)
const handleScroll = e => {}
</script>

<style lang="scss" scoped>
.pdf-preview {
  position: relative;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  background: rgb(66, 66, 66);
  overflow: scroll;
  .pdf-main {
    text-align: center;
    width: 650px;
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
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    border-radius: 5px;
    span {
      cursor: pointer;
    }
  }
}
</style>
