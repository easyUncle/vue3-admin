<template>
  <div class="echarts" ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
const chartRef = ref(null)
const trendData = [
  { date: '01/01', count: 3000 },
  { date: '01/02', count: 3500 },
  { date: '01/03', count: 5000 },
  { date: '01/04', count: 5200 },
  { date: '01/05', count: 16000 },
  { date: '01/06', count: 14000 },
  { date: '01/07', count: 14800 },
  { date: '01/08', count: 5000 },
  { date: '01/09', count: 7000 },
  { date: '01/10', count: 13000 },
  { date: '01/11', count: 8000 },
  { date: '01/12', count: 13000 },
  { date: '01/13', count: 18000 },
  { date: '01/14', count: 12000 },
  { date: '01/15', count: 8000 },
  { date: '01/16', count: 13000 },
  { date: '01/17', count: 12000 },
  { date: '01/18', count: 14000 },
  { date: '01/19', count: 9000 },
  { date: '01/20', count: 8000 },
  { date: '01/21', count: 7000 },
  { date: '01/22', count: 6000 },
  { date: '01/23', count: 8000 },
  { date: '01/24', count: 7000 },
  { date: '01/25', count: 12000 },
  { date: '01/26', count: 14000 },
  { date: '01/27', count: 13000 },
  { date: '01/28', count: 3000 },
  { date: '01/29', count: 5000 },
  { date: '01/30', count: 6000 }
]
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        console.log(params)
        return `<div class='custom-tooltip'>${params[0].axisValue}<span class='value'>${params[0].data}</span>人次访问</div>`
      },
      padding: 0,
      backgroundColor: 'transparent',
      borderWidth: 0
    },
    grid: {
      top: '12%',
      left: '6%',
      bottom: '14%',
      right: '5%'
    },
    emphasis: {
      disabled: true
    },
    xAxis: {
      type: 'category',
      data: trendData.map(item => item.date),
      boundaryGap: true,
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        interval: 1,
        color: '#fff',
        fontSize: 14
      }
    },
    yAxis: {
      type: 'value',
      name: '(访问量)',
      nameGap: 5,
      nameTextStyle: {
        color: '#fff',
        padding: [0, 40, 5, 0]
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 14,
        formatter: function (value) {
          return value > 10000 ? (value / 10000).toFixed(1) + 'w' : value
        }
      }
    },
    series: [
      {
        data: trendData.map(item => item.count),
        type: 'line',
        color: 'rgb(255, 199, 37,0.7)',
        smooth: true,
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showSymbol: false,
        symbolSize: 10,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#846B38' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#403E47' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#11144E' // 100% 处的颜色
              }
            ]
          }
        },
        lineStyle: {
          color: 'rgb(255, 199, 37,0.4)'
        },
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: -20,
        shadowColor: 'rgba(255, 199, 37, 0)' //阴影颜色
      }
    ]
  }
  useEcharts(myChart, option)
})
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  ::v-deep(.custom-tooltip) {
    height: 70px;
    width: 250px;
    display: flex;
    color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: url(../images/line-bg.png) no-repeat;
    background-size: 100% 100%;
    .value {
      color: yellow;
      padding-left: 20px;
    }
  }
}
</style>
