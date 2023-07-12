import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install ( app ) {
    app.directive('img-lazy',{
      // mounted：选项式生命周期函数、onMounted：组合式生命周期钩子
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if ( isIntersecting ) {
            el.src = binding.value
            stop()
          }
        })
      },
    })
  }
}