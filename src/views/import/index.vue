<template>
  <div>
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import UploadExcel from '@/components/uploadExcel/'
const onSuccess = data => {
  console.log(data)
}
</script>

<style lang="scss" scoped></style>
