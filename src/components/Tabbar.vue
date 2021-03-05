<template>
    <van-tabbar :value="active">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
        <van-tabbar-item
            icon="shopping-cart-o"
            to="/shopping"
            :badge="totalCount"
            id="shopping"
        >
            购物车
        </van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Tabbar",
    props: ["active"],
    computed: {
        ...mapState("goods", {
            counterMap: "counterMap"
        }),
        totalCount() {
            const count = Object.values(this.counterMap).reduce((prev, item) => prev + item, 0);
            return count > 99 ? "99+" : count;
        }
    }
}
</script>
