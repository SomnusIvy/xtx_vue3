import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


// 测试接口函数
// import { getCategoryAPI } from '@/apis/test'
// getCategoryAPI().then(res => console.log(res))

import { lazyPlugin } from '@/directives/index'
import { componentPlugin } from '@/components'


const app = createApp(App)
const pinia = createPinia()

app.use(createPinia())
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
