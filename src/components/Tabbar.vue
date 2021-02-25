<template>
    <van-tabbar v-model="active2">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/shopping" :badge="allCount">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Tabbar",
    props: ["active"],
    computed: {
        active2: {
            get() {
                return this.active
            },
            set() {}
        },
        ...mapState("goods", {
            counterMap: "counterMap"
        }),
        allCount() {
            const count = Object.values(this.counterMap).reduce((prev, item) => prev + item, 0);
            if (count > 99) {
                return "99+";
            }
            return count;
        }
    }
}
</script>
