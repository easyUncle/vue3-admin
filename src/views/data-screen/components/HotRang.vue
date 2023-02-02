<template>
  <div class="hotRang">
    <div class="header">
      <span>排名</span>
      <span>景区</span>
      <span>预约数量</span>
    </div>
    <div class="echarts" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
import { ranking1, ranking2, ranking3, ranking4 } from '../assets/ranking-icon'

const chartRef = ref(null)
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chartRef.value)
  const colors = ['#F57474', '#F8B448', '#1089E7', '#56D0E3', '#8B78F6']
  const data = [
    {
      value: 79999,
      name: '峨眉山',
      percentage: '80%',
      maxValue: 100000
    },
    {
      value: 59999,
      name: '稻城亚丁',
      percentage: '60%',
      maxValue: 100000
    },
    {
      value: 49999,
      name: '九寨沟',
      percentage: '50%',
      maxValue: 100000
    },
    {
      value: 39999,
      name: '万里长城',
      percentage: '40%',
      maxValue: 100000
    },
    {
      value: 29999,
      name: '北京故宫',
      percentage: '30%',
      maxValue: 100000
    }
  ]
  const option = {
    tooltip: {},
    legend: {},
    grid: {
      top: '5%',
      left: '5%',
      right: '5%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axiosLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'category',
        data: data.map(item => item.name),
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          formatter: function (value) {
            const title = value.length > 6 ? value.slice(0, 6) + '...' : value
            const index = data.findIndex(item => item.name === value) + 1
            const res = [
              `{rank${index > 3 ? '' : index}|NO.${index}}`,
              `{title|${title}}`
            ].join(' ')
            return res
          },
          rich: {
            rank1: {
              width: 60,
              backgroundColor: {
                image: ranking1
              },
              color: '#fff',
              align: 'center',
              lineHeight: 20,
              height: 20,
              fontSize: 13
            },
            rank2: {
              width: 60,
              backgroundColor: {
                image: ranking2
              },
              color: '#fff',
              fontSize: 13,
              align: 'center',
              lineHeight: 20,
              height: 20
            },
            rank3: {
              width: 60,
              backgroundColor: {
                image: ranking3
              },
              color: '#fff',
              fontSize: 13,
              align: 'center',
              lineHeight: 20,
              height: 20
            },
            rank: {
              width: 60,
              backgroundColor: {
                image: ranking4
              },
              color: '#fff',
              fontSize: 13,
              align: 'center',
              lineHeight: 20,
              height: 20
            },
            title: {
              width: 60,
              fontSize: 13,
              color: '#fff',
              align: 'center',
              padding: [0, 10, 0, 20]
            }
          }
        }
      },
      {
        type: 'category',
        data: data.map(item => item.value),
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#fff'
        }
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: 12,
        data: data,
        barCategoryGap: 2,
        itemStyle: {
          color: function (params) {
            const len = colors.length
            return colors[params.dataIndex % len]
          },
          borderRadius: 10
        },
        label: {
          show: true,
          color: '#fff',
          position: 'inside',
          fontSize: 12,
          formatter: params => {
            return data[params.dataIndex].percentage
          }
        }
      },
      {
        type: 'bar',
        barWidth: 18,
        data: data.map(item => item.maxValue),
        itemStyle: {
          color: 'none',
          borderColor: '#00c1de',
          borderWidth: 1,
          borderRadius: 10
        },
        barGap: '-120%'
      }
    ]
  }
  useEcharts(myChart, option)
})
</script>

<style lang="scss" scoped>
.hotRang {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: url(../images/rankingChart-bg.png) no-repeat;
    background-size: 100% 100%;
    span {
      width: 18%;
      margin-left: 4px;
      font-size: 14px;
      font-weight: bold;
      color: #fdbc52;
      text-align: center;
      font-weight: bolder;
      &:last-child {
        margin-left: 60px;
      }
    }
  }
  .echarts {
    width: 100%;
    flex: 1;
  }
}
</style>
