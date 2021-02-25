<template>
    <van-tabbar v-model="active2">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/shopping">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    name: "Tabbar",
    props: ["active"],
    computed: {
        active2: {
            get() {
                return this.active
            },
            set() {}
        }
    }
}
</script>
