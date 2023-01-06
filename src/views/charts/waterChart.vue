<template>
  <div ref="chartRef" :style="{ height: '500px', width: '100%' }"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { onMounted, ref } from 'vue'
import { useEcharts } from '@/hook/useEcharts.js'
const chartRef = ref(null)
onMounted(() => {
  const myChart = echarts.init(chartRef.value)

  const options = {
    series: [
      {
        type: 'liquidFill',
        name: 'Liquid Fill',
        data: [0.6, 0.5],
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: 'rgba(251, 173, 23, 0)'
              },
              {
                offset: 0.5,
                color: 'rgba(251, 173, 23, .2)'
              },
              {
                offset: 0,
                color: 'rgba(251, 173, 23, 1)'
              }
            ],
            globalCoord: false
          }
        ],
        // waveAnimation: false,
        // animationDuration: 0,
        // animationDurationUpdate: 0,
        // amplitude: 0,
        outline: {
          borderDistance: 10,
          itemStyle: {
            borderWidth: 8,
            borderColor: 'rgba(251, 173, 23,0.5)',
            shadowBlur: 0,
            shadowColor: 'rgba(255, 0, 0, 1)'
          }
        },
        backgroundStyle: {
          color: 'transparent'
          // borderColor: '#156ACF',
          // borderWidth: 1,
          // shadowColor: 'rgba(0, 0, 0, 0.4)',
          // shadowBlur: 20
        },
        label: {
          formatter: '{a}\n{b}\nValue: {c}',
          fontSize: 28,
          fontWeight: '10',
          color: '#000',
          insideColor: ''
        },
        emphasis: {
          itemStyle: {
            opacity: 0.9
          }
        }
      }
    ]
  }
  useEcharts(myChart, options)
})
</script>

<style lang="scss" scoped></style>
