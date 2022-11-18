<template>
  <el-dialog
    :model-value="modelValue"
    title="主题色更换"
    width="25%"
    @close="closeDialog"
  >
    <div class="color-picker">
      <span class="color-picker-title">选择主题颜色</span>
      <el-color-picker v-model="mColor" :predefine="predefinedColor" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="selectColorConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import variables from '@/styles/variables.scss'
import { COLOR_PICKER } from '@/constant/index.js'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'
const store = useStore()
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const mColor = ref(variables.menuBg)
const predefinedColor = ref(COLOR_PICKER)
const emit = defineEmits(['update:modelValue'])
const closeDialog = () => {
  emit('update:modelValue', false)
}
const selectColorConfirm = async () => {
  const style = await generateNewStyle(mColor.value)
  writeNewStyle(style)
  store.commit('theme/setMainColor', mColor.value)
  closeDialog()
}
</script>

<style lang="scss" scoped>
.color-picker {
  width: 100%;
  text-align: center;
  .color-picker-title {
    margin-bottom: 20px;
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>
