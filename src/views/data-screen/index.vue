<template>
  <div class="dataScreen-container">
    <div class="dataScreen" ref="dataScreenRef">
      <div class="dataScreen-header">
        <div class="header-lf">
          <span class="home">首页</span>
        </div>
        <div class="header-ctr">
          <div class="header-ctr-title">
            <span>智慧旅游可视化大数据展示平台</span>
            <div class="header-ctr-warnin">平台警告信息（2条）</div>
          </div>
        </div>
        <div class="header-rg">
          <span class="download">统计报告</span>
          <span class="time"
            >当前时间：{{
              $filters.dateFilter(time, 'YYYY-MM-DD HH:mm:ss')
            }}</span
          >
        </div>
      </div>
      <div class="dataScreen-main">
        <div class="main-lf">
          <div class="main-top">
            <div class="main-title">
              <span>实时游客统计</span>
              <img src="./images/dataScreen-title.png" />
            </div>
            <div class="chart">
              <RealTimeVisitorStat />
            </div>
          </div>
          <div class="main-middle">
            <div class="main-title">
              <span>男女比例</span>
              <img src="./images/dataScreen-title.png" />
            </div>
            <div class="chart">
              <ManFemalRate />
            </div>
          </div>
          <div class="main-bottom">
            <div class="main-title">
              <span>年龄比例</span>
              <img src="./images/dataScreen-title.png" />
            </div>
            <div class="chart">
              <AgeRate></AgeRate>
            </div>
          </div>
        </div>
        <div class="main-ctr">
          <div class="chinaMap">
            <ChinaMap></ChinaMap>
          </div>
          <div class="center-bottom">
            <div class="main-title">
              <span>未来30天游客量趋势图</span>
              <img src="./images/dataScreen-title.png" />
            </div>
            <Next30daysTrend></Next30daysTrend>
          </div>
        </div>
        <div class="main-rg">
          <div class="main-top">
            <div class="main-title">
              <span>热门景区排行</span>
              <img src="./images/dataScreen-title.png" />
            </div>
            <div class="chart">
              <HotRang></HotRang>
            </div>
          </div>
          <div class="main-middle">
            <div class="main-title">
              <span>年度游客量对比</span>
              <img src="./images/dataScreen-title.png" />
            </div>
            <div class="chart">
              <YearVisitorCompare></YearVisitorCompare>
            </div>
          </div>
          <div class="main-bottom">
            <div class="main-title">
              <span>预约渠道数量统计</span>
              <img src="./images/dataScreen-title.png" />
            </div>
            <div class="chart">
              <ChannelStat></ChannelStat>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RealTimeVisitorStat from './components/RealTimeVisitorStat.vue'
import ManFemalRate from './components/ManFemalRate'
import AgeRate from './components/AgeRate.vue'
import HotRang from './components/HotRang.vue'
import YearVisitorCompare from './components/YearVisitorCompare.vue'
import ChannelStat from './components/ChannelStat.vue'
import ChinaMap from './components/ChinaMap.vue'
import Next30daysTrend from './components/Next30daysTrend.vue'
const dataScreenRef = ref(null)
onMounted(() => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
    dataScreenRef.value.style.width = '1920px'
    dataScreenRef.value.style.height = '1080px'
  }
  window.addEventListener('resize', resize)
})
/**
 * 窗口resize事件
 */
const resize = () => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
}
/**
 * 获取缩放比例
 */
const getScale = (width = 1920, height = 1080) => {
  const vw = window.innerWidth / width
  const vh = window.innerHeight / height
  return vw > vh ? vh : vw
}
/**
 * 获取当前时间
 */
const time = ref(0)
const getCurrentTime = () => {
  setInterval(() => {
    time.value = new Date().getTime()
  }, 1000)
}
getCurrentTime()
</script>

<style lang="scss" scoped>
.dataScreen-container {
  width: 100%;
  height: 100%;
  background: url('./images/bg.png') no-repeat center center;
  background-size: cover;
  .dataScreen {
    width: 100%;
    position: fixed;
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .dataScreen-header {
      display: flex;
      flex-direction: row;
      height: 38px;
      .download,
      .home {
        width: 136px;
        height: 42px;
        line-height: 42px;
        background: url(./images/dataScreen-header-btn-bg-l.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 18;
        font-weight: bolder;
        text-align: center;
        color: #29fcff;
        cursor: pointer;
      }
      .header-lf {
        position: relative;
        width: 567px;
        background: url(./images/dataScreen-header-left-bg.png) no-repeat;
        background-size: 100% 100%;
      }
      .header-ctr {
        flex: 1;
        position: relative;
        .header-ctr-title {
          position: absolute;
          width: 100%;
          height: 80px;
          background: url(./images/dataScreen-header-center-bg.png) no-repeat;
          top: 0;
          left: 0;
          text-align: center;
          span {
            width: 100%;
            height: 80px;
            line-height: 80px;
            color: #29fcff;
            font-weight: 600;
            font-size: 30px;
            letter-spacing: 4px;
          }
        }
        .header-ctr-warnin {
          position: absolute;
          width: 622px;
          height: 44px;
          line-height: 44px;
          font-size: 16px;
          color: #fff;
          background: url(./images/dataScreen-header-warn-bg.png) no-repeat;
          bottom: -42px;
          left: 50%;
          font-weight: bolder;
          transform: translate(-50%);
        }
      }
      .header-rg {
        position: relative;
        width: 567px;
        display: flex;
        flex-direction: row;
        background: url(./images/dataScreen-header-right-bg.png) no-repeat;
        .download {
          font-size: 20px;
          left: 0;
          background: url(./images/dataScreen-header-btn-bg-r.png) no-repeat;
        }
        .time {
          font-size: 17px;
          font-weight: bolder;
          line-height: 38px;
          color: #05e8fe;
          margin-left: 200px;
        }
      }
    }
    .dataScreen-main {
      display: flex;
      flex: 1;
      box-sizing: border-box;
      padding: 12px 42px 20px;
      .main-lf,
      .main-rg {
        width: 394px;
        height: 100%;
        margin-right: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .main-top {
          height: 37%;
          background: url(./images/dataScreen-main-lt.png) no-repeat;
          background-size: 100% 100%;
        }
        .main-middle {
          height: 30%;
          background: url(./images/dataScreen-main-lc.png) no-repeat;
          background-size: 100% 100%;
        }
        .main-bottom {
          height: 27%;
          background: url(./images/dataScreen-main-lb.png) no-repeat;
          background-size: 100% 100%;
        }
        .main-top,
        .main-middle,
        .main-bottom {
          position: relative;
          padding-top: 54px;
          box-sizing: border-box;
          .chart {
            height: 100%;
          }
        }
      }
      .main-rg {
        margin-left: 40px;
        margin-right: 0;
      }
      .main-ctr {
        flex: 1;
        display: flex;
        flex-direction: column;
        .chinaMap {
          flex: 1;
          margin-top: 78px;
        }
        .center-bottom {
          position: relative;
          height: 252px;
          box-sizing: border-box;
          background: url(./images/dataScreen-main-cb.png) no-repeat;
          background-size: 100% 100%;
          padding-top: 57px;
        }
      }
      .main-title {
        position: absolute;
        top: 0;
        left: 0;
        span {
          display: block;
          color: #fff;
          font-size: 16px;
          font-weight: bolder;
          letter-spacing: 2px;
        }
        img {
          width: 68px;
          height: 7px;
        }
      }
    }
  }
}
</style>
