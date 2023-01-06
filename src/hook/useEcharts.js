import { onUnmounted, onActivated, onDeactivated } from 'vue'

export function useEcharts(myChart, option) {
  option && myChart.setOption(option)
  const resizeChart = () => {
    myChart && myChart.resize()
  }

  window.addEventListener('resize', resizeChart)
  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    myChart.dispose()
  })
  onActivated(() => {
    window.addEventListener('resize', resizeChart)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', resizeChart)
  })
}
