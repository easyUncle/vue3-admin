<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
    <li @click="onCloseCurrentClick">
      {{ $t('msg.tagsView.closeCurrent') }}
    </li>
    <li @click="onCloseAllClick">
      {{ $t('msg.tagsView.closeAll') }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const emits = defineEmits([
  'refresh',
  'closeRight',
  'closeOther',
  'closeCurrent',
  'closeAll'
])
const onRefreshClick = () => {
  emits('refresh')
}
const onCloseRightClick = () => {
  emits('closeRight')
}
const onCloseOtherClick = () => {
  emits('closeOther')
}
const onCloseCurrentClick = () => {
  emits('closeCurrent')
}
const onCloseAllClick = () => {
  emits('closeAll')
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
