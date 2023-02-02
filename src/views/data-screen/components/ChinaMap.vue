<template>
  <div class="china-map">
    <div class="map-header">景区实时客流量</div>
    <div class="echarts" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hook/useEcharts'
import mapJson from '../assets/china.json'
const mapData = [
  {
    fromName: '北京',
    toName: '上海',
    coords: [
      [116.4551, 40.2539],
      [121.4648, 31.2891]
    ]
  },
  {
    fromName: '上海',
    toName: '北京',
    coords: [
      [121.4648, 31.2891],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '北京',
    toName: '广州',
    coords: [
      [116.4551, 40.2539],
      [113.5107, 23.2196]
    ]
  },
  {
    fromName: '广州',
    toName: '北京',
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '北京',
    toName: '成都',
    coords: [
      [116.4551, 40.2539],
      [103.9526, 30.7617]
    ]
  },
  {
    fromName: '成都',
    toName: '北京',
    coords: [
      [103.9526, 30.7617],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '成都',
    toName: '新疆维吾尔自治区',
    coords: [
      [103.9526, 30.7617],
      [85.294711, 41.371801]
    ]
  },
  {
    fromName: ' 新疆维吾尔自治区',
    toName: '成都',
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617]
    ]
  }
]
const planePath =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

const chartRef = ref(null)
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chartRef.value)
  echarts.registerMap('china', mapJson)
  const option = {
    tooltip: {},
    geo: {
      map: 'china',
      zoom: 1.5,
      center: [103.823557, 33.058039],
      roam: false,
      grid: {
        left: '0px',
        right: '80px',
        top: '10px',
        bottom: '10px'
      },
      itemStyle: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#073684' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#061E3D' // 100% 处的颜色
            }
          ]
        },
        borderColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#00F6FF' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#87ADCB' // 100% 处的颜色
            }
          ]
        },
        shadowColor: 'rgba(255,255,255,0.1)',
        shadowOffsetY: 0,
        shadowBlur: 60,
        borderWidth: 1
      },
      emphasis: {
        label: {
          color: '#fff'
        },
        itemStyle: {
          areaColor: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#073684' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#2B91B7' // 100% 处的颜色
              }
            ]
          }
        }
      },
      label: {
        show: true,
        color: '#fff'
      },
      tooltip: {
        show: false
      }
    },
    series: [
      {
        name: '',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: 'green', //arrow箭头的颜色
          symbolSize: 15
        },
        lineStyle: {
          color: '#fff',
          width: 0,
          opacity: 0.6,
          curveness: 0.2
        },
        data: mapData
      },
      {
        name: '',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15
        },
        lineStyle: {
          color: '#fff',
          width: 1,
          opacity: 0.5,
          curveness: 0.2
        },
        data: mapData
      }
    ]
  }
  useEcharts(myChart, option)
})
</script>

<style lang="scss" scoped>
.china-map {
  width: 100%;
  height: 100%;
  position: relative;
  .map-header {
    position: absolute;
    top: 10px;
    left: 0;
    background: url(../images/map-title-bg.png) no-repeat;
    background-size: 100% 100%;
    line-height: 25px;
    height: 25px;
    width: 275px;
    font-size: 14px;
    color: #fff;
    padding-left: 20px;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
