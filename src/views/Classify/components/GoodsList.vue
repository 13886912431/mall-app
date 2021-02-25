<template>
    <div class="goods-wrapper" :class="{ center: loadingGoods }">
        <van-loading size="26px" vertical color="#d13193" v-if="loadingGoods">加载中...</van-loading>

        <div class="goods-content" v-else>
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
                <li class="item"
                    :class="{ active: optionActive === 'price-up' || optionActive === 'price-down' }"
                    @click="changeOptionActive('price')"
                >
                    价格
                </li>
            </ul>

            <van-empty
                v-if="goodsList.total === 0"
                image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无商品"
            />
            <ul class="goods" v-else>
                <li class="item"
                    v-for="(item, index) in goodsList.list"
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
                            <van-icon name="add" color="#ff1a90" size="24" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "GoodsList",
    data() {
        return {
            optionActive: "all",
            
        }
    },
    computed: {
        ...mapState("goods", {
            loadingGoods: "loadingGoods",
            goodsList: "goodsList"
        })
    },
    methods: {
        changeOptionActive(type) {
            if (this.optionActive === type) return;

            if (type === "price") {
                if (this.optionActive === "price-up") {
                    this.optionActive = "price-down";
                } else {
                    this.optionActive = "price-up";
                }
            } else {
                this.optionActive = type;
            }

            console.log(this.optionActive);
           
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
}
.goods {
    height: calc(100% - 25px);
    overflow-y: auto;
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
</style>