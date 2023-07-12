import httpInstance from "@/utils/http"

// 声明函数const和function都可以。const可以在声明前调用。const声明后常量的值就不能改变。
export function getBannerAPI ( params = {} ) {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}

export const getHotAPI = () => {
  return  httpInstance({
    url: '/home/hot'
  })
}

export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}