<script setup>
import { useScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/categoryStore'

const { y } = useScroll(window)
const categoryStore = useCategoryStore()

</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <router-link to="/" class="logo"></router-link>
      <ul class="app-header-nav ">
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink :to="`/category/${item.id}`" active-class="active">{{ item.name }}</RouterLink>
          <!-- <RouterLink to="/">首页</RouterLink> -->
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app-header-sticky {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 80px;
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    // 隐藏
    transform: translateY(-100%);
    opacity: 0;
    // 显示
    &.show{
      transition: all 0.3s linear;
      transform: none;
      opacity: 1;
    }

    .container {
      display: flex;
      align-items: center;
    }
    .logo {
      width: 200px;
      height: 80px;
      // right:背景图片靠对象右侧开始显示
      background: url('@/assets/images/logo.png') no-repeat right 2px;
      background-size: 160px auto;
    }
    .app-header-nav {
       display: flex;
       padding-left: 40px;
       z-index: 999;
       li {
        margin-right: 40px;
        width: 38px;
        text-align: center;
        a {
          font-size: 16px;
          height: 32px;
          line-height: 32px;
          display: block;
          &:hover {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
          }
        }
        .active {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
       }
    }

    .right {
      display: flex;
      width: 220px;
      text-align: center;
      padding-left: 40px;
      border-left: 1px solid $xtxColor;
      a {
        margin-right: 40px;
        line-height: 1;
        width: 38px;
        font-size: 16px;
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
</style>