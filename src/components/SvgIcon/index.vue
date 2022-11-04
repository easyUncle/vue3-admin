<template>
  <div
    v-if="isExternal"
    class="svg-icon svg-external-icon"
    :style="externalStyle"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate'
import { computed, defineProps } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  }
})

const isExternal = computed(() => external(props.icon))
const iconName = computed(() => `#icon-${props.icon}`)
const externalStyle = computed(() => {
  return {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
