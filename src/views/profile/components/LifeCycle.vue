<template>
  <div id="lifeCycle">
    <div class="lifeCycle-item">
      <div class="public-info">
        <div class="avatar">
          <img :src="require('@/assets/avatar.png')" />
        </div>
        <div class="info">
          <span class="username">E.sun</span>
          <span class="time">2022-11-25</span>
        </div>
      </div>
      <div class="container">今天天气晴朗，于是我出去溜了一条狗</div>
      <ul class="operate">
        <li class="operate-item">
          <svg-icon icon="share" class="icon"></svg-icon>
          <span>Share</span>
        </li>
        <li class="operate-item">
          <svg-icon icon="like" class="icon"></svg-icon>
          <span>Like</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#lifeCycle {
  .lifeCycle-item {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    .public-info {
      height: 60px;
      .avatar {
        display: inline-block;
        width: 50px;
        height: 50px;
        vertical-align: middle;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .info {
        margin-left: 20px;
        display: inline-block;
        vertical-align: middle;
        .username {
          display: block;
          font-size: 16px;
          font-weight: bold;
        }
        .time {
          display: block;
          font-size: 12px;
          color: #ccc;
        }
      }
    }
    .operate {
      margin-top: 20px;
      .operate-item {
        display: inline-block;
        font-size: 13px;
        color: #666;
        margin-right: 30px;
        .icon {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
