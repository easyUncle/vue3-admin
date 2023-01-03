<template>
  <div>
    <div class="fixedHeader">
      <h4 class="title">固定表头, 按照表头顺序排序</h4>
      <fixed-header></fixed-header>
    </div>
    <div class="unFixedHeader">
      <h4 class="title">不固定表头, 按照点击顺序排序</h4>
      <unfixed-header></unfixed-header>
    </div>
  </div>
</template>

<script setup>
import FixedHeader from './components/FixedHeader.vue'
import UnfixedHeader from './components/UnfixedHeader.vue'
</script>

<style lang="scss" scoped>
.fixedHeader {
  margin-bottom: 50px;
}
</style>
