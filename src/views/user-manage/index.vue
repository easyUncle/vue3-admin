<template>
  <div id="userManage">
    <el-card class="list">
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column type="index" />
        <el-table-column
          prop="name"
          :label="$t('msg.excel.name')"
          width="180"
        />
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
          width="180"
        />
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :preview-src-list="[row.avatar]"
              :src="row.avatar"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template v-slot="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="320"
        >
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="gotoDetail(row)">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button type="info" size="small">{{
              $t('msg.excel.remove')
            }}</el-button>
            <el-button
              type="danger"
              size="small"
              v-permission="'distributePermission'"
              @click="onDistributePermissionClick(row)"
              >{{ $t('msg.role.assignPermissions') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="showDialog"
      :routes="permissionRoutes"
      :role="role"
      @updateRole="updateRole"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { getUserManageList } from '@/api/user-manage.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DistributePermission from './components/DistributePermission.vue'
const roleList = ref([])
const router = useRouter()
/**
 * 获取列表数据
 */
const getRoleList = async () => {
  const res = await getUserManageList()
  roleList.value = res
  console.log(res)
}
getRoleList()

/**
 * 跳转到详情页
 */
const gotoDetail = row => {
  const { id } = row
  router.push(`/user/info/${id}`)
}
/**
 * 分配权限
 */
const showDialog = ref(false)
const permissionRoutes = ref([])
const role = ref(null)
const onDistributePermissionClick = row => {
  role.value = row
  permissionRoutes.value = row.routes
  showDialog.value = true
}
const updateRole = ({ updatedRole }) => {
  console.log(roleList.value)
  roleList.value.forEach((role, index) => {
    if (role.key === updatedRole.key) {
      roleList.value.splice(index, 1, updatedRole)
    }
  })
}
</script>

<style lang="scss" scoped>
#userManage {
  .header {
    margin-bottom: 20px;
  }
  :deep(.avatar) {
    width: 50px;
    height: 50px;
  }
}
</style>
