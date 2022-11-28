<template>
  <div id="user-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关于我</span>
        </div>
      </template>
      <div class="avatar">
        <div class="avatar-inner">
          <span>Hello</span>
          <span>admin</span>
        </div>
        <div
          class="avatar-outter"
          :style="{
            backgroundImage: `url(${$store.getters.avatar})`
          }"
        ></div>
      </div>
      <div class="userName">Super Admin</div>
      <div class="userRole">admin</div>
      <div class="education">
        <div class="header">
          <svg-icon icon="introduce"></svg-icon>
          <span>个人信息</span>
        </div>
        <div class="container">
          Graduacted from GuangDong Oscean University in Computer Science And
          Technology
        </div>
      </div>
      <div class="skill">
        <div class="header">
          <svg-icon icon="skill"></svg-icon>
          <span>Skills</span>
        </div>
        <div class="skill-item" v-for="skill in skills" :key="skill">
          <span class="name">{{ skill }}</span>
          <el-progress :percentage="100" status="success"></el-progress>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const skills = ref([
  'Vue',
  'JavaScript',
  'TypeScript',
  '微信小程序',
  '后台系统开发',
  '移动端开发'
])
</script>

<style lang="scss" scoped>
#user-card {
  .box-card {
    .avatar {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      justify-content: center;
      position: relative;
      .avatar-inner {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        font-size: 16px;
        z-index: 100;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.05) inset;
        span:first-child {
          margin-top: 20px;
          display: block;
        }
      }
      .avatar-outter {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 101;
        border-radius: 50%;
        overflow: hidden;
        background-position: center center;
        background-size: cover;
        transition: all 0.5s ease-in-out;
        transform-origin: 95% 40%;

        &:hover {
          transform: rotate(-110deg);
        }
      }
    }
    .userName,
    .userRole {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .education,
    .skill {
      margin-top: 20px;
      .header {
        font-size: 16px;
        margin-bottom: 10px;
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        span {
          margin-left: 10px;
        }
      }
      .container {
        color: #ccc;
        font-size: 16px;
      }
    }
    .skill {
      .skill-item {
        margin-bottom: 10px;
        .name {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
