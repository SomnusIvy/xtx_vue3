<script setup>
// import { getCategoryAPI } from '@/apis/layout'
// import { ref, onMounted } from 'vue'

// const categoryList = ref([])
// const getCategory = async () => {
//   const res = await getCategoryAPI()
//   // console.log(res)
//   categoryList.value = res.result
// }
// onMounted( () => getCategory() )

import { useCategoryStore } from '@/stores/categoryStore'
import HeaderCart from './HeaderCart.vue'

const categoryStore = useCategoryStore()

</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">小兔鲜</router-link>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <router-link :to="`/category/${item.id}`" active-class="active">{{ item.name }}</router-link>
        </li> 
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>

      <HeaderCart></HeaderCart>

    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    // routerlink标签从最终渲染的DOM来看，相当于a标签
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 999;
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
      .active{
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

}
</style>