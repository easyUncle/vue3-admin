<template>
  <div>
    <!-- 子集 menu 菜单 -->
    <el-submenu
      v-if="route.children && route.children.length > 0"
      :index="route.path"
    >
      <template #title>
        <menu-item
          v-if="route.meta"
          :icon="route.meta && route.meta.icon"
          :title="route.meta && route.meta.title"
        ></menu-item>
      </template>
      <sidebar-item
        v-for="item in route.children"
        :route="item"
        :key="item.path"
      ></sidebar-item>
    </el-submenu>
    <!-- 具体菜单项 -->
    <el-menu-item v-else :index="route.path">
      <menu-item
        v-if="route.meta"
        :icon="route.meta && route.meta.icon"
        :title="route.meta && route.meta.title"
      ></menu-item>
    </el-menu-item>
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { defineProps } from 'vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
