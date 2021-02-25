<template>
    <div class="classify-wrapper tabber-bottom">
        <div class="search center">
            <van-icon name="search" />
            <span>荔枝水果9.99</span>
        </div>

        <!-- 顶部横向菜单 -->
        <TopMenu />

        <!-- 左侧纵向菜单 -->
        <SideMenu />

        <GoodsList />

        <Tabbar :active="1" />
    </div>
</template>

<script>
import GoodsList from "./components/GoodsList";
import SideMenu from "./components/SideMenu";
import TopMenu from "./components/TopMenu";

export default {
    name: "Classify",
    components: {
        GoodsList,
        SideMenu,
        TopMenu
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
}
</style>