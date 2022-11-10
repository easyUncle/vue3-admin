export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true
  }),
  mutations: {
    // 左侧菜单伸缩
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
