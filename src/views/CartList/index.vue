<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const singleCheck = ( i, seleceted ) => {
  // console.log( i, seleceted )
  cartStore.singleCheck( i.skuId, seleceted )
}
const allCheck = selected => {
  cartStore.allCheck(selected)
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <el-checkbox :model-value="cartStore.isAll" @change="allCheck"/>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in cartStore.cartList" :key="i.id">
              <td>
                <el-checkbox :model-value="i.selected" @change="selected => singleCheck( i, selected )"/>
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.price }}</p>
              </td>
              <td class="tc">
                <el-input-number v-model="i.count" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="cartStore.delCart(i)">
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="$router.push('/home')">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      <div class="action">
        <div class="batch">
          共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="$router.push('/checkout')" >下单结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .xtx-cart-page {
    margin-top: 20px;
    .cart {
      background: #fff;
      color: #666;
      table {
        border-spacing: 0;  // 边框间距 
        border-collapse: collapse;  // 表格的细线边框
        line-height: 24px;
        th,
        td {
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;
          &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
          }
        }
        th {
          font-size: 16px;
          font-weight: normal;
          line-height: 50px;
        }
        .goods {
          display: flex;
          align-items: center;
          img {
            width: 100px;
            height: 100px;
          }
          >div {
            width: 280px;
            font-size: 16px;
            padding-left: 10px;
          }
        }
        .tc {
          text-align: center;
          a {
            color: $xtxColor;
          }
          .f16 {
            font-size: 16px;
          }

        }
        .cart-none {
          padding: 120px 0;
        }
      }
    }
    .red {
      color: $priceColor;
    }
    .action {
      display: flex;
      margin-top: 20px;
      padding: 0 30px;
      background: #fff;
      height: 80px;
      align-items: center;
      font-size: 16px;
      justify-content: space-between;
      .red {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
</style>