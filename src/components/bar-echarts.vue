<template>
  <div ref="containerEl" class="pie-container" :style="{ width: width, height: height }"></div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import useEcharts from '../hooks/useEcharts';
  
  const props = defineProps({
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    echartsData: {
      type: Array,
      default: () => ([])
    }
  })

  const containerEl = ref(null)

  onMounted(() => {
    setupEcharts(props.echartsData)
  })

  watch(() => props.echartsData, (newV, oldV) => {
    setupEcharts(newV)
  })

  let echartsInstance = null
  // 用数据生成echarts
  const setupEcharts = (data) => {
    if (!echartsInstance) {
      echartsInstance = useEcharts(containerEl)
    }
    const option = getOption(data)
    echartsInstance.setOption(option)
  }

  const getOption = (echartData = []) => {
    const category = echartData.map(item => item.name)
    const categoryData = echartData.map(item => item.value)
    const option = {
      grid: {
        left: "5%",
        right: "5%",
        top: "30%",
        bottom: "5%",
        containLabel: true, // grid 区域是否包含坐标轴的刻度标签
      },
      tooltip: {},
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: "#42A4FF",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "white",
        },

        data: category,
      },
      yAxis: {
        name: "个",
        nameTextStyle: {
          color: "white",
          fontSize: 13,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#42A4FF",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#42A4FF",
          },
        },
        axisLabel: {
          color: "white",
        },
      },
      series: [
        {
          name: "销量",
          type: "bar",
          barWidth: 17,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#01B1FF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#033BFF", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          data: categoryData,
        },
      ],
    };
    
    return option
  }
</script>

<style lang="less" scoped>

</style>