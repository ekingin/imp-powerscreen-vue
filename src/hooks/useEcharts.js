import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

/**
 * 对echarts图表封装
 * @param { Element } containerEl echarts容器元素
 * @returns 
 */
export default function useEcharts(containerEl) {
  const eInstance = echarts.init(containerEl.value, null, { renderer: 'svg' })

  onUnmounted(() => {
    eInstance.dispose()
  })

  return eInstance
}