<template>
    <div class="goods-card">
        <div class="img">
            <van-image :src="images[0]" ref="img" lazy-load>
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
        </div>
        <div class="content">   
            <div class="title van-ellipsis">{{ title }}</div>
            <div class="desc van-ellipsis">{{ desc }}</div>
            <div class="tags">
                <span v-for="(tag, index) in tags" :key="index">
                    {{ tag }}
                </span> 
            </div>
            <div class="bottom between">
                <div class="price">¥{{ price }}</div>
                <van-stepper
                    :value="count"
                    theme="round"
                    disable-input
                    :show-input="count !== 0"
                    :show-minus="count !== 0"
                    async-change
                    min="0"
                    @change="changeBuyCount($event)"
                    @plus="plusBuyCount(images[0])"
                    @click.native.stop
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import flyTo from "@/utils/flyTo";

export default {
    name: "GoodsCard",
    props: ["id", "images", "title", "desc", "tags", "price", "count", "confirmDelete", "useFly"],
    methods: {
        ...mapMutations("goods", {
            changeCounterMap: "changeCounterMap"
        }),
        /**
         * @param {*} count 该商品购买数量
         */
        async changeBuyCount(count) {
            if (this.confirmDelete && count === 0) {
                try {
                    await this.$dialog.confirm({
                        message: "您是否要删除该商品?"
                    })
                    this.$emit("delete", this.id);
                } catch (error) {}
            } else {
                this.changeCounterMap({ id: this.id, count });
            }
        },
        // 点击添加商品，这里仅仅只做飞入动画
        plusBuyCount(src) {
            if (!this.useFly) return;

            const img = this.$refs.img.$el;
            const { offsetWidth: width, offsetHeight: height } = img;
            const { left: startX, top: startY } = img.getBoundingClientRect();

            const shopping = document.getElementById("shopping");
            const { offsetWidth: shoppingWidth, offsetHeight: shoppingHeight } = shopping;
            let { left: endX, top: endY } = shopping.getBoundingClientRect();
            
            endX += shoppingWidth / 2;
            endY += shoppingHeight / 2;

            flyTo({ src, width, height, endX, endY, startX, startY });
        },
    }
}
</script>

<style lang="less" scoped>
.van-stepper {
    /deep/ button {
        width: 20px;
        height: 20px;
        &.van-stepper__plus {
            background-color: #ff1a90;
        }
        &.van-stepper__minus {
            color: #ff1a90;
            border-color: #ff1a90;
        }
    }   
}

.goods-card {
    display: flex;
    height: 100px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    line-height: initial;
}
.content {
    flex: 1;
    min-width: 0;
}
.img {
    margin-right: 20px;
    .van-image {
        width: 90px;
        height: 90px;
    }
}
.bottom {
    height: 28px;
}
.title {
    margin: 5px 0;
    font-size: 13px;
}
.desc {
    color: #cecece;
}
.tags {
    color: #cecece;
    margin: 4px 0;
    span {
        border: 1px solid #cecece;
        padding: 2px;
        border-radius: 5px;
        &:not(:last-child) {
            margin-right: 5px;
        }
    }
}
.price {
    color: #ff1a90;
    font-size: 14px;
    font-weight: bold;
}
</style>