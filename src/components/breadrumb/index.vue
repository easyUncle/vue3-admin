<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span
          v-if="
            index === breadcrumbData.length - 1 ||
            item.redirect === 'noRedirect'
          "
          >{{ generateTitle(item.meta.title) }}</span
        >
        <a v-else @click="handleClick(item.path)" class="redirect">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const router = useRouter()
const store = useStore()
const breadcrumbData = ref([])

// 计算面包屑结构数据
const getBreadcrumbData = () => {
  let matched = route.matched
  matched = matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]
  if (!isHome(first)) {
    matched = [{ path: '/', meta: { title: 'profile' } }].concat(matched)
  }
  breadcrumbData.value = matched.filter(item => item.meta && item.meta.title)
}
const isHome = item => {
  const title = item.meta && item.meta.title
  if (!title) {
    return false
  }

  return title.trim().toLocaleLowerCase() === 'profile'
}
const handleClick = path => {
  router.push({ path })
}
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
// 主题色切换
const linkHoverColor = computed(() => store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.2s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
// https://cn.vuejs.org/guide/built-ins/transition-group.html#move-transitions
// 确保将离开的元素从布局流中删除，以便能够正确地计算移动的动画。
.breadcrumb-leave-active {
  position: absolute;
}
</style>
