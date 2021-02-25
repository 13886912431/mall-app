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
                    <ul class="goods">
                        <li class="item"
                            v-for="(item, index) in goodsList"
                            :key="index"
                        >
                            <div class="img">
                                <van-image :src="item.images[0]" lazy-load>
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>
                                </van-image>
                            </div>
                            <div class="content">   
                                <div class="title">{{ item.title }}</div>
                                <div class="desc">{{ item.desc }}</div>
                                <div class="tags">
                                    <span v-for="(tag, index) in item.tags" :key="index">
                                        {{ tag }}
                                    </span> 
                                </div>
                                <div class="bottom between">
                                    <div class="price">¥{{ item.price }}</div>
                                    <van-stepper v-model="buyNum" theme="round" disable-input />
                                </div>
                            </div>
                        </li>
                    </ul>
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
            buyNum: 0
        }
    },
    computed: {
        ...mapState("goods", {
            loadingGoods: "loadingGoods",
            goodsList: "goodsList"
        })
    },
    methods: {
        ...mapMutations("goods", {
            resetGoodsList: "resetGoodsList"
        }),
        changeOptionActive(sort) {
            if (this.optionActive === sort) return;

            if (sort === "price") {
                if (this.optionActive === "price-up") {
                    this.optionActive = "price-down";
                } else {
                    this.optionActive = "price-up";
                }
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
        }
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
        bottom: 3px;
    }
    .price::before {
        border-bottom-color: #eee;
        top: 3px;
    }
    .price.price-down::after {
        border-top-color: #ff1a90;
    }
    .price.price-up::before {
        border-bottom-color: #ff1a90;
    }
}
.goods {
    .item {
        display: flex;
        height: 100px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
    }
    .content {
        width: 170px;
    }
    .img {
        margin-right: 20px;
        .van-image {
            width: 90px;
            height: 90px;
        }
    }
    .title {
        margin: 5px 0;
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .desc {
        color: #cecece;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
</style>