import _ from 'loadsh'
import { onMounted, onUnmounted } from 'vue'

/**
 * 大屏适配，缩放页面
 * @param { Object } option 配置对象
 */
export default function useScalePage(option) {
  // resize 节流
  const throttleFn = _.throttle(function (){
    triggerScale()
  }, 100)

  onMounted(() => {
    triggerScale()
    window.addEventListener("resize", throttleFn)
  })
  onUnmounted(() => {
    window.removeEventListener("resize", throttleFn)
  })

  function triggerScale() {
    // 目标屏幕的宽高比
    const targetWidth = option.targetWidth || 1920
    const targetHeight = option.targetHeight || 1080
    const targetRatio = option.targetRatio || 16 / 9

    // 客户端屏幕的宽高比
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
    const clientHeigth = document.documentElement.clientHeight || document.body.clientHeight
    const clientRatio = clientWidth / clientHeigth 

    // 缩放比例，默认根据宽度比进行缩放
    let scaleRatio = clientWidth / targetWidth

    if (clientRatio > targetRatio) {
      // 如果是超宽屏幕按照高度比进行缩放，网页居中
      scaleRatio = clientHeigth / targetHeight
      document.body.style = `
        width: ${targetWidth}px; 
        height: ${targetHeight}px; 
        transform: scale(${scaleRatio}) translateX(-50%); 
        left: 50%;
      `
    } else {
      document.body.style = `
        width: ${targetWidth}px; 
        height: ${targetHeight}px;
        transform: scale(${scaleRatio});
      `
    }
  }
}