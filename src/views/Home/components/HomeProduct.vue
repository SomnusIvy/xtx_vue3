<script setup>
import HomePanel from './HomePanel.vue'
import { getGoodsAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import GoodsItem from './GoodsItem.vue'

// getGoodsAPI()
const goodsProduct = ref([])
const getGoodsList = async () => {
  const res = await getGoodsAPI()
  goodsProduct.value = res.result
}
onMounted( () => getGoodsList() )

</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <router-link to="/" class="cover">
          <img v-img-lazy="cate.picture">
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </router-link>
        <ul class="goods-list">
          <li v-for="good in cate.goods" :key="good.id">
            <GoodsItem :goods="good"></GoodsItem>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style lang="scss" scoped>
.home-product {
  background: #fff;
  margin-top: 20px;
  // .sub {
  //   margin-bottom: 2px;
  // }

  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        position: absolute;
        top: 50%;
        left: 0;
        width: 188px;
        height: 66px;
        line-height: 66px;
        display: flex;
        font-size: 18px;
        font-weight: normal;
        color: #fff;
        transform: translate3d(0,-50%,0); // Y轴上移黑色标签高度一半，使居中
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,0.7);
          }
        }
      }
    }
  }
  .goods-list {
    display: flex;
    width: 990px;
    flex-wrap: wrap; // 项目超出容器换行
    li {
      width: 240px;
      height: 300px;
      margin-right: 10px;
      margin-bottom: 10px;
      &:nth-last-child(-n + 4) {
        margin-bottom: 0;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>