import Vue from 'vue'
import App from './App'
//引入公共样式
// import './style/gg.css'
Vue.config.productionTip = false

//全局公共底部
import TAB from './components/tabBar/tabBar.vue' ;
Vue.use('TAB' , TAB) ;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
