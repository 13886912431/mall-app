import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vant";
import "lib-flexible";
import "./assets/css/common.less";
import "./assets/css/reset.css";

const context = require.context("./components", true, /\.vue$/);
context.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], context(key).default));

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
