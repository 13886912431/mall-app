<template>
    <div 
        class="fly-wrapper"
        :style="{
            width: `${width}px`,
            height: `${height}px`,
            opacity,
            transform: `translate(${endX}px, ${endY}px) scale(${scale})`,
        }"
    >
        <van-image :src="src" />
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.fly-wrapper {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    transition: all 1s;
    transform-origin: 0 0;
    .van-image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }
}
</style>