<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <user-card></user-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="项目经历" name="project">
              <life-cycle></life-cycle>
            </el-tab-pane>
            <el-tab-pane label="工作经历" name="work">
              <time-line></time-line>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import UserCard from './components/UserCard.vue'
import TimeLine from './components/TimeLine.vue'
import LifeCycle from './components/LifeCycle.vue'
import { ref } from 'vue'
const activeName = ref('work')
</script>

<style lang="scss" scoped></style>
