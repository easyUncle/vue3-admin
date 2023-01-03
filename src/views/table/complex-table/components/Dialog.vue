<template>
  <div>
    <el-dialog :model-value="modelValue" :title="title" @close="close">
      <el-form :model="form" ref="formRef" label-width="70px" :rules="rules">
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.key"
              :value="item.key"
              :label="item.display_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="timestamp">
          <el-date-picker
            v-model="form.timestamp"
            type="datetime"
            placeholder="请选择时间"
          />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="form.status"
            class="filter-item"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="重要性">
          <el-rate v-model="form.importance" :max="3"></el-rate>
        </el-form-item>
        <el-form-item label="点评">
          <el-input
            v-model="form.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
const typeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
const statusOptions = ['published', 'draft', 'deleted']
const form = ref({
  id: undefined,
  importance: 1,
  remark: '',
  timestamp: new Date(),
  title: '',
  status: 'published',
  type: ''
})
const props = defineProps({
  modelValue: Boolean,
  title: {
    required: true,
    type: String
  },
  defaultForm: {
    type: Object,
    default: null
  }
})
const emits = defineEmits(['update:modelValue', 'submit'])
/**
 * 取消
 */
const cancel = () => {
  formRef.value.resetFields()
  emits('update:modelValue', false)
}
/**
 * 确定
 */
const confirm = async () => {
  await submitForm()
}
/**
 * 关闭dialog
 */
const close = () => {
  emits('update:modelValue', false)
}
/**
 * 表单验证
 */
const rules = {
  type: [{ required: true, message: '类型为必填项', trigger: 'change' }],
  timestamp: [{ required: true, message: '时间为必填项', trigger: 'blur' }],
  title: [{ required: true, message: '标题为必填项', trigger: 'blur' }]
}
const formRef = ref(null)
const submitForm = async () => {
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      emits('update:modelValue', false)
      emits('submit', form.value)
    } else {
      console.log('error submit!', fields)
    }
  })
}
watch(
  () => props.modelValue,
  newVal => {
    if (!newVal) return
    form.value = props.defaultForm ? props.defaultForm : form.value
    formRef.value && formRef.value.resetFields()
  }
)
</script>

<style lang="scss" scoped></style>
