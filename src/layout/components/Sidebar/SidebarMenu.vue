<template>
  <el-menu
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="true"
    :active-text-color="variables.menuActiveText"
    :collapse-transition="false"
    :default-active="activeMenu"
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
import variables from '@/styles/variables.scss'
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
const activeMenu = computed(() => {
  const { path } = route
  console.log(path)
  return path
})
</script>

<style lang="scss" scoped></style>
