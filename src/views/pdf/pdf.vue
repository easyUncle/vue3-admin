<template>
  <div class="pdf">
    <el-button type="primary" @click="show">预览</el-button>
    <div v-if="isShow">
      <VuePdf
        v-for="page in numOfPages"
        :key="page"
        :src="pdfSrc"
        :page="page"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createLoadingTask, VuePdf } from 'vue3-pdfjs/esm'
import pdfUrl from '@/assets/李东阳.pdf'
const numOfPages = ref(0)
const pdfSrc = ref(pdfUrl)

onMounted(() => {
  const loadingTask = createLoadingTask(pdfSrc.value)
  loadingTask.promise.then(pdf => {
    numOfPages.value = pdf.numPages
  })
})
const isShow = ref(false)
const show = () => {
  isShow.value = true
}
</script>

<style lang="scss" scoped>
.pdf {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
