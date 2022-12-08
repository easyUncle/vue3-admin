<template>
  <div class="distributePermission">
    <el-dialog
      :model-value="modelValue"
      :title="$t('msg.excel.roleDialogTitle')"
      width="50%"
      @close="close"
    >
      <el-tree
        ref="treeRef"
        :data="allRoutes"
        show-checkbox
        check-strictly
        node-key="path"
        default-expand-all
        :props="defaultProps"
      >
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
          <el-button type="primary" @click="confirm">
            {{ $t('msg.universal.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, nextTick } from 'vue'
import { getRoutes, updateRole } from '@/api/role.js'
import { filterRoutes, generateRoutes, flatterRoutes } from '@/utils/route.js'
import { computed } from '@vue/reactivity'
import { ElNotification } from 'element-plus'
import _ from 'lodash'
import path from 'path'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  routes: {
    type: Array,
    default: () => {
      return []
    }
  },
  role: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emits = defineEmits(['update:modelValue', 'updateRole'])
/**
 * 关闭dialog
 */
const closeDialog = () => {
  emits('update:modelValue', false)
}

/**
 * 点击取消
 */
const close = () => {
  closeDialog()
}
/**
 * 点击确认
 */
const confirm = () => {
  updateRouteConfirm()
  closeDialog()
}
/**
 * 获取路由信息
 */
const allRoutes = ref([])
const getAllRouteList = async () => {
  const routes = await getRoutes()
  allRoutes.value = generateRoutes(filterRoutes(routes))
}
const defaultProps = {
  children: 'children',
  label: 'name'
}
getAllRouteList()
/**
 *
 */
const treeRef = ref(null)
const routes = computed(() => props.routes)
watch(routes, async routes => {
  await nextTick()
  if (routes.length) {
    console.log(flatterRoutes(generateRoutes(filterRoutes(props.routes))))
    treeRef.value.setCheckedNodes(
      flatterRoutes(generateRoutes(filterRoutes(props.routes)))
    )
  }
})
/**
 * 更新路由
 */
const updateRouteConfirm = async () => {
  const { role } = props
  const checkedKeys = treeRef.value.getCheckedKeys()
  role.routes = filterCheckedRoutes(
    _.cloneDeep(allRoutes.value),
    '/',
    checkedKeys
  )
  await updateRole(role.key, role)
  emits('updateRole', { updatedRole: role })
  ElNotification({
    title: '成功',
    type: 'success',
    message: '分配权限成功'
  })
}
/**
 * 筛选选中路由
 */
const filterCheckedRoutes = (routes, basePath, checkedKeys) => {
  const res = []
  for (const route of routes) {
    const routePath = path.resolve(basePath, route.path)
    console.log(routePath)
    if (route.children) {
      route.children = filterCheckedRoutes(
        route.children,
        route.path,
        checkedKeys
      )
    }
    if (checkedKeys.includes(routePath)) {
      res.push(route)
    }
  }
  return res
}
</script>

<style lang="scss" scoped></style>
