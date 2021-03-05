<template>
    <div class="goods-wrapper">
        <div class="goods-content">
            <ul class="options flex">
                <li class="item"
                    :class="{ active: optionActive === 'all' }"
                    @click="changeOptionActive('all')"
                >
                    综合
                </li>
                <li class="item"
                    :class="{ active: optionActive === 'sale' }"
                    @click="changeOptionActive('sale')"
                >
                    销量
                </li>
                <li class="item price"
                    :class="[
                        { active: optionActive === 'price-up' || optionActive === 'price-down' },
                        optionActive
                    ]"
                    @click="changeOptionActive('price')"
                >
                    价格
                </li>
            </ul>

            <van-empty
                v-if="goodsList.length === 0"
                image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无商品"
            />
            <van-pull-refresh v-else v-model="refreshLoading" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <GoodsCard
                        v-for="(item, index) in goodsList"
                        :key="index"
                        v-bind="item"
                        :count="counterMap[item.id] || 0"
                        :useFly="true"
                    />
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: "GoodsList",
    data() {
        return {
            optionActive: "all",
            page: 1,
            refreshLoading: false,
            loading: false,
            finished: false,
        }
    },
    computed: {
        ...mapState("goods", {
            goodsList: "goodsList",
            counterMap: "counterMap"
        })
    },
    methods: {
        ...mapMutations("goods", {
            resetGoodsList: "resetGoodsList",
        }),
        changeOptionActive(sort) {
            if (this.optionActive === sort) return;

            if (sort === "price") {
                this.optionActive = this.optionActive === "price-up" ? "price-down" : "price-up";
            } else {
                this.optionActive = sort;
            }

            this.onRefresh();
        },
        getGoodsList({ page = 1, sort }) {
            return this.$store.dispatch("goods/getGoodsList", {
                page,
                sort
            });
        },
        onRefresh() {
            this.finished = false;
            this.page = 0;
            this.resetGoodsList();
            this.onLoad();
        },
        async onLoad() {
            this.page += 1;
            this.loading = true;
            const res = await this.getGoodsList({ page: this.page, sort: this.optionActive });
            if (res.length === 0) {
                this.finished = true;
            } else {
                this.loading = false;
            }
        },
    }
}
</script>

<style lang="less" scoped>
.goods-wrapper {
    position: fixed;
    left: 79px;
    right: 0;
    top: 135px;
    bottom: 50px;
}
.goods-content {
    height: 100%;
}
.van-list {
    padding-right: 10px;
}
.options {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    height: 25px;
    color: #cecece;
    text-align: center;
    justify-content: flex-end;
    .item {
        height: 100%;
        line-height: 25px;
        width: 50px;
        &.active {
            color: #ff1a90;
            font-weight: bold;
        }
    }
    .price {
        position: relative;
    }
    .price::before,
    .price::after {
        content: "";
        position: absolute;
        right: 2px;
        width: 0;
        height: 0;
        border: 4px solid transparent;
    }
    .price::after {
        border-top-color: #eee;
        bottom: 2px;
    }
    .price::before {
        border-bottom-color: #eee;
        top: 4px;
    }
    .price.price-down::after {
        border-top-color: #ff1a90;
    }
    .price.price-up::before {
        border-bottom-color: #ff1a90;
    }
}

.van-empty {
    /deep/ .van-empty__image {
        width: 60px;
        height: 60px;
    }
}
.van-pull-refresh {
    overflow: auto;
    height: calc(100% - 25px);
}
</style>