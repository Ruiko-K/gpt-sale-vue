import { createApp } from 'vue'
import App from './App.vue'
import vuex from './vuex.js'
import router from './router'; // 导入路由配置
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'

const app = createApp(App).use(router).use(vuex).use(ElementPlus);
app.mount('#app')

