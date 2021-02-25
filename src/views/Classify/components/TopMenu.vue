<template>
    <div class="topmenu-wrapper flex" ref="topmenu">
        <div
            class="item between"
            v-for="(item, index) in menuList"
            ref="item"
            :key="index" 
            :class="{ 'active': active === index }"
            @touchstart="onmove = false"
            @touchmove="onmove = true"
            @touchend="changeActive(index)"
        >
            <div class="img-wrap center">
                <van-image :src="item.imgURL" />
            </div>
            <div class="title">{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
import menuList from "@/assets/json/menuList";
import Animate from "@/utils/animate";

export default {
    name: "TopMenu",
    data() {
        return {
            menuList,
            active: -1,
            onmove: false,
        }
    },
    methods: {
        async changeActive(index) {
            if (this.onmove) return;
            if (this.active === index) return;

            const topmenu = this.$refs.topmenu;
            const topmenuWidth = topmenu.offsetWidth; // wrapper的宽度
            const item = this.$refs.item[index];
            const itemLeft = item.offsetLeft; // item与父级的距离
            const itemWidth = item.offsetWidth; // item的宽度
            new Animate({
                begin: {
                    move: topmenu.scrollLeft
                },
                end: {
                    move: itemLeft - topmenuWidth / 2 + itemWidth / 2
                },
                onmove(val) {
                    topmenu.scrollLeft = val.move;
                },
            })
            this.active = index;
            sessionStorage.setItem("topMenuActive", index);

            await this.$store.dispatch("goods/getSideList", this.menuList[index].title);
        }
    },
    mounted() {
        const active = sessionStorage.getItem("topMenuActive");
        this.changeActive(active ? +active : 0);
    },
}
</script>

<style lang="less" scoped>
.topmenu-wrapper {
    position: relative;
    overflow-x: auto;
    margin-bottom: 10px;
    &::-webkit-scrollbar {
        background: none;
        height: 0;
        width: 0;
    }
}
.item {
    width: 50px;
    height: 70px;
    padding: 0 8px;
    flex-direction: column;
    
    .img-wrap {
        border-width: 2px;
        border-style: solid;
        border-radius: 23px;
        border-color: transparent;
        padding: 1px;
        
        .van-image {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            overflow: hidden;
        } 
    }
    .title {
        border-radius: 30px;
        text-align: center;
        white-space: nowrap;
    }
    &.active {
        .img-wrap {
            border-color: #d13193;
        }
        .title {
            background-color: #d13193;
            color: #fff;
            padding: 0 2px;
            white-space: nowrap;
            font-weight: bold;
        }
    }
}
</style>