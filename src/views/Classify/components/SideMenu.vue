<template>
    <div class="sidemenu-wrapper" ref="sidemenu">
        <div 
            class="item"
            v-for="(item, index) in sideList"
            ref="item"
            :key="index" 
            :class="{ 'active': active === index }"
            @touchstart="onmove = false"
            @touchmove="onmove = true"
            @touchend="changeActive(index)"
            @click="changeActive(index)"
        >
            {{ index === 0 ? '全部' : item }}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Animate from "@/utils/animate";

export default {
    name: "SideMenu",
    data() {
        return {
            active: 0,
            onmove: false,
            page: 1,
            sort: "all"
        }
    },
    computed: {
        ...mapState("goods", {
            sideList: "sideList",
            loadingSide: "loadingSide"
        })
    }, 
    methods: {
        ...mapMutations("goods", {
            resetGoodsList: "resetGoodsList"
        }),
        // 切换左侧菜单
        async changeActive(index) {
            if (this.onmove) return;
            if (this.active === index) return;

            const sidemenu = this.$refs.sidemenu;
            const sidemenuHeight = sidemenu.offsetHeight; // wrapper的高度
            const item = this.$refs.item[index];
            const itemTop = item.offsetTop; // item与父级的距离
            const itemHeight = item.offsetHeight; // item的高度
            new Animate({
                begin: {
                    move: sidemenu.scrollTop
                },
                end: {
                    move: itemTop - sidemenuHeight / 2 + itemHeight / 2
                },
                onmove(val) {
                    sidemenu.scrollTop = val.move;
                },
            })

            this.active = index;

            this.getGoodsList({
                type: this.sideList[index]
            });
        },

        getGoodsList({ page = 1, type }) {
            this.resetGoodsList();
            this.$store.dispatch("goods/getGoodsList", {
                page,
                type,
            });
        }
    },
    watch: {
        // 顶部菜单切换，左侧菜单数据变化执行
        sideList() {
            this.active = 0;

            this.getGoodsList({
                type: this.sideList[this.active],
            });
        },
    },
    mounted() {
        this.getGoodsList({
            type: this.sideList[this.active],
        });
    }
}
</script>

<style lang="less" scoped>
.sidemenu-wrapper {
    position: fixed;
    left: 0;
    width: 79px;
    top: 135px;
    bottom: 50px;
    background: #f8f8f8;
    overflow-y: auto;
    &::-webkit-scrollbar {
        background: none;
        height: 0;
        width: 0;
    }
}
.item {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: relative;
    cursor: pointer;

    &.active {
        color: #ff1a90;
        font-weight: bold;
    }
    &.active::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 6px;
        height: 18px;
        transform: translateY(-50%);
        background-color: #ff1a90;
    }
}
</style>