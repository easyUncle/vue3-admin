<template>
  <div id="timeline">
    <el-timeline :style="{ paddingLeft: '10px' }">
      <el-timeline-item
        v-for="item in experience"
        :key="item.timestamp"
        :timestamp="item.timestamp"
        :icon="item.icon"
        placement="top"
        :type="item.type"
        :color="item.color"
      >
        <el-card>
          <h4>{{ item.company }}</h4>
          <p>{{ item.duty }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { SuccessFilled } from '@element-plus/icons-vue'
const experience = [
  {
    timestamp: '2019/7/17-2020/11/02',
    company: '广州亿博科技有限公司'
  },
  {
    timestamp: '2020/11/03-2022/4/24',
    company: '彩讯科技股份有限公司'
  },
  {
    timestamp: '2022/4/25-至今',
    company: '通联支付网络服务有限公司',
    icon: SuccessFilled,
    type: 'success',
    color: '#0bbd87'
  }
]
</script>

<style lang="scss" scoped></style>
