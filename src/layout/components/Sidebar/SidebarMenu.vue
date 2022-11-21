<template>
  <el-menu
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :unique-opened="true"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :collapse-transition="false"
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    mode="vertical"
    router
  >
    <sidebar-item
      v-for="route in permissionRoutes"
      :key="route.path"
      :route="route"
    />
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { computed, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateRoutes } from '@/utils/route'
defineProps({
  route: {
    type: Object,
    require: true,
    default: () => {}
  }
})
const router = useRouter()
const route = useRoute()
const permissionRoutes = computed(() =>
  generateRoutes(filterRoutes(router.getRoutes()))
)
console.log(filterRoutes(router.getRoutes()))

const activeMenu = computed(() => {
  const { path } = route
  console.log(path)
  return path
})
</script>

<style lang="scss" scoped></style>
