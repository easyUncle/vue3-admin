<template>
  <div class="echarts" ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
const data = [
  {
    value: 40,
    name: '智慧文旅平台',
    percentage: '40%'
  },
  {
    value: 10,
    name: '携程',
    percentage: '10%'
  },
  {
    value: 20,
    name: '飞猪',
    percentage: '20%'
  },
  {
    value: 30,
    name: '其他渠道',
    percentage: '30%'
  }
]
const chartRef = ref(null)
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chartRef.value)
  const option = {
    legend: {
      icon: 'circle',
      orient: 'vertical',
      left: '5%',
      top: 'center',
      textStyle: {
        color: '#fff',
        fontWeight: 'bolder'
      },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      data: data.map(item => item.name),
      formatter: function (name) {
        const index = data.findIndex(item => item.name === name)
        return (
          name + ' ' + '---' + ' ' + (data[index] && data[index].percentage)
        )
      }
    },
    tooltip: {},
    series: [
      {
        name: '平台',
        type: 'pie',
        data: data,
        color: [
          '#0E7CE2',
          '#FF8352',
          '#E271DE',
          '#F8456B',
          '#00FFFF',
          '#4AEAB0'
        ],
        radius: ['62%', '85%'],
        center: ['68%', '45%'],
        itemStyle: {
          borderColor: '#031845',
          borderWidth: 10
        },
        labelLine: {
          show: false
        },
        label: {
          show: false
        }
      },
      {
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['68%', '45%'],
        startAngle: -20,
        silent: true,
        labelLine: {
          show: false
        },
        label: {
          show: false
        },
        data: [
          {
            value: 75,
            itemStyle: {
              color: '#fff'
            }
          },
          {
            value: 45,
            itemStyle: {
              color: 'transparent'
            }
          }
        ]
      },
      {
        type: 'pie',
        radius: ['0', '35%'],
        center: ['68%', '45%'],
        silent: true,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 25,
            itemStyle: {
              color: '#transparent',
              borderWidth: 5,
              borderColor: '#fff'
            }
          },
          {
            value: 75,
            itemStyle: {
              color: 'transparent'
            }
          }
        ]
      },
      {
        type: 'pie',
        radius: ['49%', '50%'],
        center: ['68%', '45%'],
        silent: true,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: new Array(100).fill('').map((item, index) => {
          if (index % 2) {
            return {
              value: 1,
              itemStyle: {
                color: '#fff'
              }
            }
          } else {
            return {
              value: 1.5,
              itemStyle: {
                color: '#000'
              }
            }
          }
        })
      },
      {
        type: 'pie',
        radius: ['57%', '59%'],
        center: ['68%', '45%'],
        silent: true,
        zlevel: 0,
        z: 10,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 25,
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
                    color: 'rgba(51,149,191,0.5)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,0,0,0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          {
            value: 25,
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
                    color: 'rgba(0,0,0,0)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(51,149,191,0.5)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          {
            value: 25,
            itemStyle: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0,0,0,0)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(51,149,191,0.5)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          {
            value: 25,
            itemStyle: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(51,149,191,0.5)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,0,0,0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      },
      {
        type: 'pie',
        radius: ['97%', '98%'],
        center: ['68%', '45%'],
        silent: true,
        zlevel: 0,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        color: [
          '#007afe',
          'transparent',
          '#007afe',
          'transparent',
          '#007afe',
          'transparent'
        ],
        data: [
          {
            value: 17,
            name: '11'
          },
          {
            value: 17,
            name: '12'
          },
          {
            value: 17,
            name: '13'
          },
          {
            value: 17,
            name: '14'
          },
          {
            value: 17,
            name: '15'
          },
          {
            value: 17,
            name: '16'
          }
        ]
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
}
</style>
