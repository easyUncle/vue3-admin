<template>
  <div class="echarts" ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
const annualData = [
  {
    label: new Date().getFullYear() - 2 + '年',
    value: [
      '184',
      '90',
      '120',
      '0',
      '30',
      '100',
      '80',
      '40',
      '20',
      '510',
      '350',
      '180'
    ]
  },
  {
    label: new Date().getFullYear() - 1 + '年',
    value: [
      '118',
      '509',
      '366',
      '162',
      '380',
      '123',
      '321',
      '158',
      '352',
      '474',
      '154',
      '22'
    ]
  },
  {
    label: new Date().getFullYear() + '年',
    value: [
      '548',
      '259',
      '113',
      '90',
      '69',
      '512',
      '23',
      '49',
      '28',
      '420',
      '313',
      '156'
    ]
  }
]
const colors = ['#FFA600', '#007AFE', '#FF4B7A']
const gradientColors = [
  'rgba(254, 219, 101,0.1)',
  'rgba(0, 122, 254,0.1)',
  'rgba(255, 75, 122, 0.1)'
]
const chartRef = ref(null)
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chartRef.value)
  const option = {
    grid: {
      top: '12%',
      left: '10%',
      right: '5%',
      bottom: '18%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      backgroundColor: 'transparent',
      padding: 0,
      borderWidth: 0,
      formatter: function (params) {
        const str = params
          .map(p => {
            return `<div class="year-item">
                      <span class="dot" style="background:${p.color}"></span>
                      <span class="year-name"> ${p.seriesName}</span>
                      <span class="year-value">${p.value}</span>
                    </div>`
          })
          .join('')
        const dom = `<div class="year-tooltip">
                      <div class="tooltip-month">${
                        params[0].dataIndex + 1
                      }月</div>
                      <div class="year-list">
                        ${str}
                      </div>
                    </div>`
        return dom
      }
    },
    legend: {
      right: '5%',
      top: '0%',
      itemWidth: 15,
      itemHeight: 6,
      icon: 'rect',
      itemGap: 15,
      textStyle: {
        color: '#ebebf0'
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: '#000'
      }
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      axisTick: {
        show: false
      },
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bolder'
      }
    },
    yAxis: {
      name: '(人数)',
      nameTextStyle: {
        color: '#fff',
        fontSize: 13,
        padding: [0, 30, 5, 0]
      },
      nameGap: 5,
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: true
      }
    },
    series: annualData.map((item, index) => {
      return {
        type: 'line',
        color: colors[index],
        name: item.label,
        data: item.value,
        smooth: true,
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showSymbol: false,
        lineStyle: {
          color: colors[index],
          width: 1
        },
        itemStyle: {
          color: colors[index],
          borderColor: '#646ace',
          borderWidth: 2
        },
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
                color: colors[index] // 0% 处的颜色
              },
              {
                offset: 1,
                color: gradientColors[index] // 100% 处的颜色
              }
            ]
          },
          shadowColor: 'rgba(25,163,223, 0.3)', //阴影颜色
          shadowBlur: 20
        }
      }
    })
  }
  useEcharts(myChart, option)
})
</script>

<style lang="scss" scoped>
.echarts {
  height: 100%;
  width: 100%;
}
::v-deep(.year-tooltip) {
  box-sizing: border-box;
  width: 206px;
  height: 103px;
  padding: 5px 20px;
  background: url('../images/line-bg.png') no-repeat;
  background-size: 100% 100%;
  .tooltip-month {
    display: inline-block;
    margin-bottom: 2px;
    font-size: 10px;
    color: #03b8e2;
  }
  .year-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    .year-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .year-name,
      .year-value {
        font-size: 10px;
        color: #03b8e2;
      }
      .year-value {
        display: inline-block;
        width: 25%;
        font-size: 16;
        margin-left: 20px;
      }
    }
  }
}
</style>
