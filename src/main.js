import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')
