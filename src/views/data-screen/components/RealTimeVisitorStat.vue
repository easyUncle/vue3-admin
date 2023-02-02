<template>
  <div class="visitorStat">
    <div class="total">可预约总量<span class="num">9999999</span>人</div>
    <div class="actual-wraper">
      <div class="actual-item" v-for="(item, index) in actualStr" :key="index">
        {{ item }}
      </div>
      <div class="actual-item">人</div>
    </div>
    <div class="echarts" ref="liquidRef"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
import 'echarts-liquidfill'

const actualNum = ref('2324224')
const actualStr = computed(() => {
  return actualNum.value.padStart(8, 0).split('')
})
const liquidRef = ref(null)
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(liquidRef.value)
  const option = {
    title: [
      {
        text: '预约量',
        subtext: '50%',
        left: '49%',
        top: '30%',
        textAlign: 'center',
        textStyle: {
          fontSize: 24,
          color: '#fff'
        },
        subtextStyle: {
          fontSize: 18,
          fontWeight: 'bolder',
          color: '#fff'
        }
      }
    ],
    polar: {
      radius: ['75%', '85%'],
      center: ['50%', '50%']
    },
    angleAxis: {
      max: 100,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      startAngle: 360
    },
    radiusAxis: {
      type: 'category',
      show: true
    },
    series: [
      {
        type: 'liquidFill',
        radius: '70%',
        z: 2,
        center: ['50%', '50%'],
        data: [0.5, 0.5, 0.5],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#35FAB6' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(40, 209, 247,0.3)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#31d8d5',
            shadowBlur: 20,
            shadowColor: '#50c1a7'
          }
        },
        backgroundStyle: {
          borderWidth: 1,
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: '#0D2648' // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#0D2648' // 100% 处的颜色
              },
              {
                offset: 1,
                color: '#228E7D' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        label: {
          show: false
        }
      },
      {
        type: 'pie',
        z: 1,
        radius: ['80%', '80%'],
        center: ['50%', '50%'],
        labelLine: {
          show: false
        },
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        silent: true,
        itemStyle: {
          borderWidth: 2,
          borderType: [8, 10],
          borderDashOffset: 2,
          borderColor: '#31d8d5',
          color: '#11144e',
          borderCap: 'round'
        },
        data: [55]
      },
      {
        type: 'bar',
        z: 10,
        data: [50],
        color: '#31d8d5',
        coordinateSystem: 'polar',
        roundCap: true,
        label: {
          show: false
        }
      }
    ]
  }
  useEcharts(myChart, option)
})
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: calc(100% - 50px);
}
.visitorStat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .total {
    font-size: 14px;
    color: #fff;
    position: absolute;
    top: 35px;
    right: 16px;
    .num {
      color: #ff8100;
    }
  }
  .actual-wraper {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
    .actual-item {
      background: url(../images/total.png) no-repeat;
      background-size: 100% 100%;
      font-size: 32px;
      height: 50px;
      color: #66ffff;
      margin-right: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      font-weight: bolder;
    }
  }
}
</style>
