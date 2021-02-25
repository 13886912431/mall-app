<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "app",
    methods: {
        ...mapMutations("goods", {
            setCounterMap: "setCounterMap"
        }),
    },
    created() {
        let counterMap = localStorage.getItem("counterMap");
        if (counterMap) {
            counterMap = JSON.parse(counterMap);
        } else {
            counterMap = {};
        }
        this.setCounterMap(counterMap);
    }
};
</script>

<style lang="less">
#app {
    font-size: 12px;
}
</style>
