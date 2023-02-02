<template>
  <div class="rate">
    <div class="header">
      <div class="man">
        <span>男士</span>
        <img src="../images/man.png" alt="" />
      </div>
      <div class="woman">
        <span>女士</span>
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <div class="echarts" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
const chartRef = ref(null)
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chartRef.value)
  const option = {
    grid: {
      left: 0,
      top: '30px',
      bottom: 0,
      right: 0
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'category',
        position: 'left',
        data: ['男士'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'category',
        position: 'right',
        data: ['女士'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: 19,
        data: [25],
        z: 20,
        itemStyle: {
          color: '#007AFE',
          borderRadius: 10
        },
        label: {
          show: true,
          color: '#E7E8ED',
          position: 'insideLeft',
          offset: [0, -20],
          fontSize: 12,
          formatter: () => {
            return '男士 50%'
          }
        }
      },
      {
        type: 'bar',
        barWidth: 19,
        data: [50],
        barGap: '-100%',
        itemStyle: {
          borderRadius: 10,
          color: '#FF4B7A'
        },
        label: {
          show: true,
          color: '#E7E8ED',
          position: 'insideRight',
          offset: [0, -20],
          fontSize: 12,
          formatter: () => {
            return '女士 50%'
          }
        }
      }
    ]
  }
  useEcharts(myChart, option)
})
</script>

<style lang="scss" scoped>
.rate {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 65px;
  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .man,
    .woman {
      width: 120px;
      height: 110px;
      display: flex;
      background: url(../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        display: inline-block;
        width: 60px;
        height: 60px;
      }
      span {
        font-size: 18px;
        color: #fff;
        margin-bottom: 32px;
      }
    }
    .man {
      background: url(../images/man-bg.png) no-repeat;
    }
  }
  .echarts {
    width: 100%;
    flex: 1;
  }
}
</style>
