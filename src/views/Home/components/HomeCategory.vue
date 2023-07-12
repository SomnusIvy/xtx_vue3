<script setup>
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <router-link to="/">{{ item.name }}</router-link>
        <router-link to="/" v-for="i in item.children.slice(0,2)" :key="i.id">{{ i.name }}</router-link>

        <!-- 弹层 -->
        <div class="layer">
          <!-- 此处small左方的空不是样式，是空格 -->
          <h4>分类推荐 <small>根据您的购买记录或浏览记录推荐</small></h4>

          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <router-link to="/">
                <img :src="i.picture">
                <div class="info">
                  <!-- ellipsis:vue.js的文本截断组件，省略 -->
                  <p class="name ellipsis-2">{{ i.name }}</p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>￥</i>{{ i.price }}</p>
                </div>
              </router-link>
            </li>
          </ul>

        </div>

      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: $xtxColor;
      }
      a {
        color: #fff;
        margin-right: 4px;
        &:first-child {
          font-size: 16px;
        }
      }
      .layer {
        padding: 0 15px;
        position: absolute;
        left: 250px;
        top: 0;
        width: 990px;
        height: 500px;
        background: rgba(255,255,255,0.8);
        display: none;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          // 可以拆行或拆列（第一个行在上方）
          flex-wrap: wrap;
          li {
            margin-right: 15px;
            margin-bottom: 15px;
            height: 120px;
            width: 310px;
            // background: #000;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 4px;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              &:hover {
                background: #e3f9f4;
              }
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;
                .name {
                  font-size: 16px;
                  color: #666;
                }
                .desc {
                  color: #999;
                }
                .price {
                  font-size: 22px;
                  color: $priceColor;
                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>