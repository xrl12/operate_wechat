import {createApp} from 'vue'

import App from './App.vue'
import "element-plus/dist/index.css"
import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import "./permission.ts"

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.mount('#app')
