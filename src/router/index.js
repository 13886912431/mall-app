import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: process.env.VUE_APP_ENV === "prod" ? "hash" : "history",
    routes,
});

export default router;
