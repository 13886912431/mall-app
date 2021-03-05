<template>
    <div id="app">
        <transition :name="transitionName" mode="in-out">
            <router-view class="view" />
        </transition>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "app",
    data() {
        return {
            transitionName: "",
        }
    },
    watch: {
        $route() {
            this.transitionName = this.$router.isBack ? 'out': 'in';

            this.$router.isBack = false;
        }
    },
    methods: {
        ...mapMutations("goods", {
            setCounterMap: "setCounterMap",
        }),
    },
    created() {
        let counterMap = localStorage.getItem("counterMap");
        counterMap = counterMap ? JSON.parse(counterMap) : {};
        this.setCounterMap(counterMap);
    }
};
</script>

<style lang="less">
#app {
    font-size: 12px;
    height: 100%;
}
.view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
}

// 进入动画 -- 进入页面动画
.in-enter { 
    opacity: 0;
    transform: translateX(100vw);
}
.in-enter-to {
    opacity: 1;
    transform: translateX(0); 
}
.in-enter-active {
    transition: transform .4s, opacity .4s;
    z-index: 100;
}

// 退出动画 -- 离开页面动画
.out-leave {
    opacity: 1;
    transform: translateX(0);
}
.out-leave-to {
    opacity: 0;
    transform: translateX(100vw);
}
.out-leave-active {
    transition: transform .4s, opacity .4s;
    z-index: 100;
}
</style>
