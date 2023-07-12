<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// const imageList = [
//   "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
//   "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
//   "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
//   "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
//   "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
// ]

defineProps({
  imageList: {
    type: Array,
    default: () => {}
  }
})

const curIndex = ref(0)
const mouseEnterFn = (i) => curIndex.value = i

const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY, isOutside], () => {
  if ( isOutside.value ) return
  if ( elementX.value > 100 && elementX.value < 300 ) {
    left.value = elementX.value - 100
  }
  if ( elementY.value > 100 && elementY.value < 300 ) {
    top.value = elementY.value - 100
  }
  if (elementX.value > 300) { left.value = 200 }
  if (elementX.value < 100) { left.value = 0 }
  if (elementY.value > 300) { top.value = 200 }
  if (elementY.value < 100) { top.value = 0 }
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})
</script>

<template>
  <div class="goods-image">
    <!-- ref是保存在了this身上,即vue的实例,那么标识了ref的可以在任意位置将标签取出来使用 -->
    <div class="middle" ref="target">
      <img :src="imageList[curIndex]">

      <div class="layer" v-show="!isOutside" :style="{left:`${left}px`,top:`${top}px`}" ></div>
    </div>

    <ul class="small">
      <li v-for="( img, i ) in imageList" :key="i" @mouseenter="mouseEnterFn(i)" :class="{ active: i===curIndex }">
        <img :src="img">
      </li>
    </ul>

    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[curIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`
      }
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style lang="scss" scoped>
  .goods-image {
    position: relative;
    display: flex;
    width: 480px;
    height: 400px;
    .middle {
      width: 400px;
      height: 400px;
      background: #f5f5f5;
      .layer {
        position: absolute;
        width: 200px;
        height: 200px;
        background: rgba(0,0,0,0.2);
        left: 0;
        top: 0;
      }
    }

    .small {
      width: 80px;
      li {
        margin-left: 12px;
        margin-bottom: 15px;
        width: 68px;
        height: 68px;
        cursor: pointer;
        &:hovre,&.active {
          border: 2px solid $xtxColor;
        }
      }
    }

    .large {
      position: absolute;
      left: 412px;
      top: 0;
      width: 400px;
      height: 400px;
      z-index: 500;
      // h-shadow,v-shadow,blur
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      background-repeat: no-repeat;
      background-size: 800px 800px;
      background-color: #f8f8f8;
    }
  }
</style>