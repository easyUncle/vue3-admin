<template>
  <div :class="['editor-box', disabled ? 'editor-disabled' : '']">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height }"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      :mode="mode"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useEditor } from '@/hook/useEditor.js'
import { defineProps, nextTick, defineEmits, computed } from 'vue'
import { isImage } from '@/utils/file.js'

const props = defineProps({
  modelValue: String,
  toolbarConfig: {
    type: Object,
    default: () => ({
      excludeKeys: []
    })
  },
  height: {
    type: String,
    default: '500px'
  },
  mode: {
    type: String,
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {}
}
const emits = defineEmits(['update:modelValue'])

if (props.disabled) {
  nextTick(() => {
    editorRef.value.disable()
  })
}

// hook
const { handleCreated, editorRef } = useEditor()

// computed
const valueHtml = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emits('update:modelValue', newVal)
  }
})
// 自定义上传图片
editorConfig.MENU_CONF.uploadImage = {
  async customUpload(file, insertFn) {
    console.log(await isImage(file))
    if (!(await isImage(file))) return
    alert(1)
    const formData = new FormData()
    formData.append('file', file)
    insertFn(
      'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110012.jpg'
    )
  }
}
editorConfig.MENU_CONF.uploadVideo = {
  async customUpload(file, insertFn) {
    insertFn()
  }
}
</script>

<style lang="scss" scoped>
.is-error {
  .editor-box {
    border-color: var(--el-color-danger);
  }
}

/* 富文本组件禁用样式 */
.editor-disabled {
  cursor: not-allowed !important;
}

/* 富文本组件样式 */
.editor-box {
  /* 防止富文本编辑器全屏时 tabs组件 在其层级之上 */
  z-index: 9999;
  width: 100%;
  border: 1px solid #cccccc;
  .editor-toolbar {
    border-bottom: 1px solid #cccccc;
  }
  .editor-content {
    overflow-y: hidden;
  }
}
</style>
