<script setup>
import { getTopCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'
import GoodsItem from '../Home/components/GoodsItem.vue'
import { onBeforeRouteUpdate } from 'vue-router'

const categoryList = ref({})
// 获取路由参数
const route = useRoute()
const getCategoryList = async (id = route.params.id ) => {
  const res = await getTopCategoryAPI(id)
  categoryList.value = res.result
}
onBeforeRouteUpdate( (to) => {
  getCategoryList(to.params.id)
})


const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI({distributionSite: '2'})
  bannerList.value = res.result
}
onMounted( () => getBanner())
</script>

<template>
  <div class="top-category">
    <!-- m - for classes that set margin -->
    <div class="container m-top-20">
      <div class="bread-container">
          <!-- <el-breadcrumb :separator-icon="ArrowRight"> -->
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
          </el-breadcrumb>
      </div>

      <div class="home-banner">
        <!-- elementPlus走马灯 -->
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" >
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryList.children" :key="i.id">
            <router-link :to="`/category/sub/${i.id}`">
              <img :src="i.picture">
              <p>{{ i.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="ref-goods" v-for="item in categoryList.children" :key="item.id">
        <div class="head">
          <h3>-{{ item.name }}-</h3>
        </div>
        <div class="body">
          <goods-item v-for="good in item.goods" :goods="good" :key="good.id"></goods-item>
        </div>
      </div>
    </div>
  </div>



</template>

<style lang="scss" scoped>
.top-category {
  .bread-container {
    padding: 25px 0;
  }
  .home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 500px;
    }
  }

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    position: relative;
    background: #fff;
    margin-top: 20px;
    // .head {

    // }

    .body {
      padding: 0 40px 30px;
      display: flex;
      justify-content: space-around;
    }
  }

}


</style>