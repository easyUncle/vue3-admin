<template>
  <div class="logo-container" :class="{ collapse: collapse }">
    <Transition name="sidebarLogoFade">
      <router-link v-if="collapse" class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo" />
      </router-link>

      <router-link v-else class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </Transition>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
const logo = ref(
  'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
)
const title = ref('vue-element-admin')
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.sidebarLogoFade-enter-active,
.sidebarLogoFade-enter-leave {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.logo-container {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background: #2b2f3a;
  text-align: center;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    .sidebar-logo {
      display: inline-block;
      height: 30px;
      width: 30px;
      vertical-align: middle;
    }
    .sidebar-title {
      display: inline-block;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      margin-left: 10px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
