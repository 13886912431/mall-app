import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

VueRouter.prototype.isBack = false;
VueRouter.prototype.transitionBack = function () {
    this.isBack = true;
    this.back();
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: process.env.VUE_APP_ENV === "prod" ? "hash" : "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { x: 0, y: 0 };
    }
});


export default router;
