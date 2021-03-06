<template>
    <div class="classify-wrapper">
        <router-link to="/search" tag="div" class="search center">
            <van-icon name="search" />
            <span>荔枝水果9.99</span>
        </router-link>

        <!-- 顶部横向菜单 -->
        <TopMenu />

        <van-loading v-if="loadingSide" vertical color="#ffc0cb">加载中...</van-loading>

        <template v-else>
            <!-- 左侧纵向菜单 -->
            <SideMenu />
            <!-- 商品列表 -->
            <GoodsList />
        </template>
        
        <Tabbar :active="1" />
    </div>
</template>

<script>
import { mapState } from "vuex";

import GoodsList from "./components/GoodsList";
import SideMenu from "./components/SideMenu";
import TopMenu from "./components/TopMenu";

export default {
    name: "Classify",
    components: {
        GoodsList,
        SideMenu,
        TopMenu
    },
    computed: {
        ...mapState("goods", {
            loadingSide: "loadingSide"
        })
    }
}
</script>

<style lang="less" scoped>
.classify-wrapper {
    overflow: hidden;
}
.search {
    width: 355px;
    height: 33px;
    background-color: #eee;
    font-size: 14px;
    color: #a1a1a1;
    border-radius: 10px;
    margin: 11px auto;
    cursor: pointer;
}
.van-loading {
    margin-top: 50px;
    .van-loading__spinner {
        width: 46px;
        height: 46px;
    }
}
</style>
