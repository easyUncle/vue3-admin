<template>
  <div class="userinfo-container">
    <el-card class="print-box">
      <el-button type="primary" v-print="printObj" :loading="printLoading"
        >打印</el-button
      >
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <h3 class="title">打印信息</h3>
        <div class="header">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="姓名"> 张三 </el-descriptions-item>
            <el-descriptions-item label="性别">男</el-descriptions-item>
            <el-descriptions-item label="国籍"> 中国 </el-descriptions-item>
            <el-descriptions-item label="电话"
              >134201123423</el-descriptions-item
            >
            <el-descriptions-item label="省份">广东</el-descriptions-item>
            <el-descriptions-item label="日期"
              >2022年12月06日</el-descriptions-item
            >
            <el-descriptions-item label="备注">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="地址" :span="2"
              >广东省广州市越秀区</el-descriptions-item
            >
          </el-descriptions>
          <el-image
            class="avatar"
            :src="$store.getters.avatar"
            :preview-src-list="[$store.getters.avatar]"
          ></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item label="工作">
              前端开发工程师
            </el-descriptions-item>
            <el-descriptions-item label="专业">
              计算机科学与技术
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">签字：___________日期：___________</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const remark = ref(['群众', '天选打工人'])
const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'esun-element-admin',
  // 打印前
  beforeOpenCallback(vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    :v-deep(.el-descriptions) {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
