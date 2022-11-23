<template>
  <div class="navbar">
    <hamburger class="hamburger"></hamburger>
    <!-- 面包屑 -->
    <breadrumb></breadrumb>
    <div class="right-menu">
      <!-- 引导 -->
      <guide class="right-menu-item"></guide>
      <!-- 搜索 -->
      <head-search class="right-menu-item"></head-search>
      <!-- 切换全屏 -->
      <screen-full class="right-menu-item"></screen-full>
      <!-- 切换主题 -->
      <theme-select class="right-menu-item"></theme-select>
      <!-- 切换语言 -->
      <language-select class="right-menu-item"></language-select>
      <!-- 头像 -->
      <el-dropdown trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.avatar"
          ></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/PanJiaChen/vue-element-admin/"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">{{ $t('msg.navBar.logout') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/hamburger'
import Breadrumb from '@/components/breadrumb'
import LanguageSelect from '@/components/languageSelect'
import ThemeSelect from '@/components/themeSelect'
import ScreenFull from '@/components/screenFull'
import HeadSearch from '@/components/headSearch'
import Guide from '@/components/guide'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-wrapper) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
    :deep(.right-menu-item) {
      display: inline-block;
      font-size: 24px;
      color: #5a5e66;
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .hamburger {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
