<template>
  <div class="echarts" ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
const chartRef = ref(null)
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chartRef.value)
  const data = [
    {
      value: 200,
      name: '10岁以下',
      percentage: '16%'
    },
    {
      value: 110,
      name: '10 - 18岁',
      percentage: '8%'
    },
    {
      value: 150,
      name: '18 - 30岁',
      percentage: '12%'
    },
    {
      value: 310,
      name: '30 - 40岁',
      percentage: '24%'
    },
    {
      value: 250,
      name: '40 - 60岁',
      percentage: '20%'
    },
    {
      value: 260,
      name: '60岁以上',
      percentage: '20%'
    }
  ]
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>占比：{d}%'
    },
    color: ['#F6C95C', '#EF7D33', '#1F9393', '#184EA1', '#81C8EF', '#9270CA'],
    legend: {
      orient: 'vertical',
      top: '15%',
      right: '5%',
      itemWidth: 15,
      itemHeight: 15,
      itemStyle: {},
      textStyle: {
        color: '#fff'
      },
      formatter: function (name) {
        let text = ''
        data.forEach(item => {
          if (item.name === name) {
            text = `${name} ${item.percentage}`
          }
        })
        return text
      }
    },
    grid: {
      top: 'bottom',
      left: 10,
      bottom: 10
    },
    series: [
      {
        type: 'pie',
        name: 'Age Rate',
        radius: ['40%', '80%'],
        center: ['35%', '50%'],
        data: data,
        label: {
          position: 'inside',
          formatter: function (params) {
            return params.data.percentage
          },
          color: '#fff'
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderRadius: 8
        }
      }
    ]
  }
  useEcharts(myChart, option)
})
</script>

<style lang="scss" scoped>
.echarts {
  height: 100%;
  width: 100%;
}
</style>
