import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import { useUserStore } from "./userStore"
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore( 'cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token )

  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const addCart =  async goods  => {
    const { skuId, count } = goods
    if ( isLogin.value ) {
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      const item = cartList.value.find( item => goods.skuId === item.skuId )
      if ( item ) item.count++
      else cartList.value.push( goods )
    }
  }

  const delCart = async skuId => {
    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const idx = cartList.value.findIndex( item => skuId === item.skuId )
      // 从数组中索引为 idx 开始删除，一共删除 1 个元素。
      cartList.value.splice(idx,1)
    }
  }

  const singleCheck = ( skuId, selected ) => {
    const item = cartList.value.find( item => item.skuId === skuId )
    item.selected = selected
  }
  
  const allCheck = selected => cartList.value.forEach( item => item.selected = selected )
  const isAll = computed( () => cartList.value.every( item => item.selected ) )

  // reduce(（上次调用函数的返回值，当前元素，当前元素索引），初始值)
  const allCount = computed( () => cartList.value.reduce( (a,c) => a+ c.count, 0) )
  const allPrice = computed (() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  const selectedCount = computed( () => cartList.value.filter( item => item.selected).reduce( ( a, c ) => a + c.count, 0 ))
  const selectedPrice = computed( () => cartList.value.filter( item => item.selected).reduce( (a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    allCheck,
    singleCheck,
    addCart,
    delCart,
  }
}, {
  persist: true
})