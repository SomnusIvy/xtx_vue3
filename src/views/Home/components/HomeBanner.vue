<script setup>
import { getBannerAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'


// getBannerAPI()
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI()
  bannerList.value = res.result
}
onMounted( () => getBanner())
</script>

<template>
  <div class="home-banner">
    <!-- elementPlus走马灯 -->
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  width: 1240px;
  height: 500px;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>