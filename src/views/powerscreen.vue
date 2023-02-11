<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <pie-echarts :echartsData="chargingPile"></pie-echarts>
    </div>
    <div class="left-bottom">
      <line-echarts :echartsData="processMonitoring"></line-echarts>
    </div>
    <div class="right-top">
      <right-top :panelItems="chargingTop4" :percentage="percentage"></right-top>
    </div>
    <div class="right-middle">
      <bar-echarts :echartsData="chargingStatistics"></bar-echarts>
    </div>
    <div class="right-bottom">
      <right-bottom-svg :dots="exceptionMonitoring"></right-bottom-svg>
    </div>

    <div class="main-top">
      <main-top-svg></main-top-svg>
    </div>
    <div class="main-bottom">
      <main-bottom :panelItems="dataAnalysis"></main-bottom>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  import useScalePage from '@/hooks/useScalePage'
  import pieEcharts from '@/components/pie-echarts.vue'
  import lineEcharts from '@/components/line-echarts.vue'
  import barEcharts from '@/components/bar-echarts.vue'
  import rightBottomSvg from '@/components/right-bottom-svg.vue'
  import rightTop from '@/components/right-top.vue'
  import mainTopSvg from '@/components/main-top-svg.vue'
  import mainBottom from '@/components/main-bottom.vue'
  import {
    pieData,
    processMonitoringData,
    chargingStatisticsData,
    exceptionMonitoringData,
    dataAnalysisData,
    chargingTop4Data
  } from '@/views/config/echarts-data.js'
  import { getPowerScreenData } from '@/services'
  
  // 大屏适配
  useScalePage({
    targetWidth: 1920,
    targetHeight: 1080,
    targetRatio: 16 / 9
  })
  
  // 请求数据
  const chargingPile = ref(pieData)
  const processMonitoring = ref(processMonitoringData)
  const chargingStatistics = ref(chargingStatisticsData)
  const exceptionMonitoring = ref(exceptionMonitoringData)
  const dataAnalysis = ref(dataAnalysisData)
  const chargingTop4 = ref(chargingTop4Data)
  const percentage = ref(0)

  getPowerScreenData().then(res => {
    chargingPile.value = res.data.chargingPile.data
    processMonitoring.value = res.data.processMonitoring.data
    chargingStatistics.value = res.data.chargingStatistics.data
    exceptionMonitoring.value = res.data.exceptionMonitoring.data
    dataAnalysis.value = res.data.dataAnalysis.data
    chargingTop4.value = res.data.chargingTop4.data
    percentage.value = res.data.chargingTop4.totalPercentage
  })

</script>

<style scoped>
  .screen-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/bg.png);
    background-repeat: no-repeat;
  }

  .header {
    /* 定位 */
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    height: 56px;

    /* 背景 */
    background-image: url(@/assets/images/bg_header.svg);
    background-repeat: no-repeat;
  }
  .left-top {
    /* 定位 */
    position: absolute;
    top: 116px;
    left: 16px;
    width: 536px;
    height: 443px;
    /* 背景 */
    background-image: url(@/assets/images/bg_left_top.svg);
    background-repeat: no-repeat;
  }
  .left-bottom{
     /* 定位 */
    position: absolute;
    bottom: 49px;
    left: 16px;
    width: 536px;
    height: 443px;
    /* 背景 */
    background-image: url(@/assets/images/bg_left_bottom.svg);
    background-repeat: no-repeat;
  }
  .right-top {
    position: absolute;
    right: 17px;
    top: 96px;
    width: 519px;
    height: 327px;
      
    background-image: url(../assets/images/bg_right_top.svg);
    background-repeat: no-repeat;
  }
  .right-middle {
    position: absolute;
    right: 17px;
    top: 443px;
    width: 519px;
    height: 327px;

    background-image: url(../assets/images/bg_right_center.svg);
    background-repeat: no-repeat;
  }
  .right-bottom {
    position: absolute;
    right: 17px;
    bottom: 49px;
    width: 519px;
    height: 242px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(../assets/images/bg_right_bottom.svg);
    background-repeat: no-repeat;

  }
  .main-top {
    position: absolute;
    right: 540px;
    bottom: 272px;
    width: 823px;
    height: 710px;
  }

  .main-bottom {
    position: absolute;
    right: 540px;
    bottom: 49px;
    width: 823px;
    height: 209px;
      
    background-image: url(../assets/images/bg_bottom.svg);
    background-repeat: no-repeat;
  }
</style>