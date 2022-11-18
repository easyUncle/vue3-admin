<template>
  <div class="">
    <div class="logo">
      <logo :collapse="isCollapse"></logo>
    </div>
    <el-scrollbar :style="{ background: $store.getters.cssVar.menuBg }">
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Logo from './Logo.vue'
import SidebarMenu from './SidebarMenu'
import { useStore } from 'vuex'
const store = useStore()
const isCollapse = computed(() => !store.getters.sidebarOpened)
</script>
