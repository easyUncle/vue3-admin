<template>
  <div id="userManage">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card class="list">
      <el-table :data="listData" border style="width: 100%">
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
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default>
            <el-button type="primary" size="small">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button type="danger" size="small">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { getUserManageList } from '@/api/user-manage.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const listData = ref([])
const getListData = async () => {
  const res = await getUserManageList()
  listData.value = res
  console.log(res)
}
getListData()

const onImportExcelClick = () => {
  router.push({ path: '/user/import' })
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
