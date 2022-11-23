<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { watchLangSwitch, generateTitle } from '@/utils/i18n'
const store = useStore()
const route = useRoute()
const getTitle = route => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
watch(
  route,
  (to, from) => {
    /**
     * 此处不使用...to的原因是可能深拷贝 js对象序列化（json字符串） 导致route 的一些值 序列化错误 比如route里面的函数 与undefined丢失；
     * 会发生报错vue warn: Avoid app logic that relies on enumerating keys on a component instance.
     * //https://blog.csdn.net/weixin_43245095/article/details/123091515
     */
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/add2TagViewsList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
/**
 * 国际化
 */
watchLangSwitch(() => {
  store.getters.tagViewsList.forEach((route, index) => {
    store.commit('app/setTagViewsTitle', {
      tag: {
        ...route,
        title: getTitle(route)
      },
      index
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
  padding-top: 110px;
}
</style>
