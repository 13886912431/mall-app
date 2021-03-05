import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vant";
import "lib-flexible";
import "./assets/css/reset.css";

// 将components文件夹下的vue文件全部注册为全局组件
const context = require.context("./components", true, /\.vue$/);
context.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], context(key).default));

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
