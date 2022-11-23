<template>
  <div class="tagviews-container">
    <router-link
      class="tagviews-item"
      v-for="(tag, index) in $store.getters.tagViewsList"
      :key="tag.path"
      :to="tag.path"
      :class="isActive(tag) ? 'active' : ''"
      :style="{
        background: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
      >{{ tag.title }}
      <el-icon class="close-icon" @click.stop.prevent="onCloseClick(tag, index)"
        ><Close
      /></el-icon>
    </router-link>
    <context-menu
      v-show="visiable"
      :style="menuStyle"
      :index="selectIndex"
      @refresh="onMenuRefresh"
      @closeCurrent="onMenuCloseCurrent"
      @closeRight="onMenuCloseRight"
      @closeAll="onMenuCloseAll"
      @closeOther="onMenuCloseOther"
    ></context-menu>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from '../../../store'
import ContextMenu from './ContextMenu.vue'

const route = useRoute()
const router = useRouter()
/**
 * 是否被选中
 */
const isActive = tag => {
  return tag.path === route.path
}
/**
 * 关闭标签
 */
const onCloseClick = (tag, index) => {
  store.dispatch('app/removeTagView', { type: 'current', index }).then(() => {
    if (isActive(tag)) {
      toLastView()
    }
  })
}
/**
 * 跳转到最新的一个tag
 */
const toLastView = () => {
  const route = store.getters.tagViewsList.slice(-1)[0]
  if (route && route.path) {
    router.push({ path: route.path })
  }
}
/**
 * contextMenu
 */
const visiable = ref(false)
const menuStyle = ref(null)
const selectIndex = ref(0)
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value = {
    left: x + 'px',
    top: y + 'px'
  }
  console.log(index)
  visiable.value = true
  selectIndex.value = index
}
/**
 * 关闭menu
 */
const closeMenu = () => {
  visiable.value = false
}
onMounted(() => {
  watch(visiable, value => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  })
})

const onMenuRefresh = () => {
  router.go(0)
}
/**
 * 关闭右边的标签
 */
const onMenuCloseRight = () => {
  store
    .dispatch('app/removeTagView', {
      type: 'right',
      index: selectIndex.value
    })
    .then(() => {
      toLastView()
    })
}
/**
 * 关闭其他标签
 */
const onMenuCloseOther = () => {
  store.commit('app/removeTagView', {
    type: 'other',
    index: selectIndex.value
  })
}
/**
 * 关闭当前标签
 */
const onMenuCloseCurrent = () => {
  store.commit('app/removeTagView', {
    type: 'current',
    index: selectIndex.value
  })
}
/**
 * 关闭所有
 */
const onMenuCloseAll = () => {
  store.commit('app/removeTagView', {
    type: 'all',
    index: selectIndex.value
  })
}
</script>

<style lang="scss" scoped>
.tagviews-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tagviews-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    .close-icon {
      display: inline-block;
      vertical-align: middle;
      border-radius: 50%;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
