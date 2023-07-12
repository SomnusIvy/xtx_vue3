<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
</script>

<template>
  <div class="cart">
    <a href="javascript:;" class="curr">
      <i class="iconfont icon-cart"><em>{{ cartStore.cartList.length }}</em></i>
    </a>

    <div class="layer">
      <div class="list">
        <div class="item" v-for="i in cartStore.cartList" :key="i">
          <router-link to="">
            <img v-img-lazy="i.picture">
            <div class="center">
              <p class="name ellipsis-2"></p>
              <p class="attr ellipsis">{{ i.name }}</p>
              <p class="attr ellipsis">{{ i.attrsText }}</p>
            </div>

            <div class="right">
              <p class="price">&yen;{{ i.price }}</p>
              <p class="count">x{{ i.count }}</p>
            </div>
          </router-link>

          <i class="iconfont icon-close-new" @click="cartStore.delCart(i.skuId)"></i>
        </div>
      </div>

      <div class="foot">
        <div class="total">
          <p>共 {{ cartStore.allCount }} 件商品</p>
          <p>&yen; {{ cartStore.allPrice.toFixed(2) }}</p>
        </div>

        <el-button size="large" type="primary" @click="$router.push('/cartlist')">去购物车结算</el-button>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  position: relative;
  width: 50px;
  z-index: 600;
  .curr {
    display: block;
    position: relative;
    height: 32px;
    line-height: 32px;
    text-align: center;
    .icon-cart {
      font-size: 22px;
      em {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1px 6px;
        font-style: normal;
        font-size: 12px;
        background: $helpColor;
        line-height: 1;
        color: #fff;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }

  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  .layer {
    opacity: 0;
    position: absolute;
    top: 50px;
    right: 0;
    padding-top: 10px;
    background: #fff;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border-radius: 4px;
    
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);

    &::before {  // 小三角
      content: '';
      position: absolute;
      top: -10px;
      right: 12px;
      background: #fff;
      width: 20px;
      height: 20px;
      // 小正方形，旋转45度
      transform: scale(0.6,1) rotate(45deg);
      // offset-x offset-y blur spread color position;
      box-shadow: -3px -3px 5px rgba(0,0,0,0.1);
    }

    .foot {
      padding: 10px;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      background: #f8f8f8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total {
        padding-left: 10px;
        color: #999;
        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }

  .list {
    height: 310px;
    overflow: auto;
    pad: 0 10px;
    // CSS3自定义的滚动条样式
    &::-webkit-scrollbar {  // 滚动条整体部分
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {  // 滚动条轨道
      background: #f8f8f8;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {  // 滚动条里的小方块
      background: #eee;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      position: relative;
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 10px;
      i {
        opacity: 0;
        position: absolute;
        right: 5px;
        bottom: 38px;
        color: #666;
        transition: all 0.5s;
      }
      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }

      a {
        display: flex;
        align-items: center;

        img {
          height: 80px;
          width: 80px;
        }
        .center {
          padding: 0 10px;
          width: 200px;

          .name {
            font-size: 16px;
          }

          .attr {
            color: #999;
            padding-top: 5px;
          }
        }
        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;

          .price {
            font-size: 16px;
            color: $priceColor;
          }

          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>