<template>
    <div class="search-wrapper">
        <div class="search-container flex" :class="[scrollTop > 0 ? 'shadow' : '']">
            <van-icon class="arrow-left" name="arrow-left" @click="$router.transitionBack()" />
            <van-search
                v-model="value"
                :placeholder="placeholder"
                show-action
                clear-trigger="always"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @clear="handleClear"
            >
                <template #action>
                    <van-icon
                        v-if="showGoodsList"
                        name="shopping-cart-o"
                        :badge="totalCount"
                        id="shopping"
                        @click="$router.push('/shopping')"
                    />
                    <div @click="onSearch(null)" v-else>搜索</div>
                </template>
            </van-search>
        </div>

        <div class="history-wrapper" v-if="searchHistory.length > 0 && !showGoodsList">
            <div class="top between">
                <div class="history">历史记录：</div>
                <div class="delete" @click="deleteHistory">删除记录</div>
            </div>
            
            <div class="history-list">
                <van-button
                    v-for="item in searchHistory"
                    :key="item"
                    @click="clickHistory(item)"
                >
                    {{ item }}
                </van-button>
            </div>
        </div>

        <!-- 模糊查询列表 -->
        <van-list v-show="likeSearchList.length > 0 && showLikeSearch" class="like-search-list">
            <van-cell v-for="item in likeSearchList" :key="item" @click="onSearch(item)">
                <template #title>
                    <div class="title" v-html="item.replace(new RegExp(value, 'g'), value.fontcolor('red'))"></div>
                </template>
            </van-cell>
        </van-list>

        <!-- 商品列表 -->
        <div class="goodslist" v-show="showGoodsList && goodsList.length > 0" @scroll="scrollTop = $event.target.scrollTop">
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
        </div>
        
    </div>
</template>

<script>
import { mapState } from "vuex";

import api from "@/api";
import { debounce } from "../utils";

export default {
    data() {
        return {
            value: "",
            placeholder: "酒",
            likeSearchList: [], // 模糊查询数据
            goodsList: [],
            showLikeSearch: false, // 是否显示模糊查询数据
            showGoodsList: false,
            page: 0,
            loading: false,
            finished: false,
            changeInput: false, // 是否改变输入框的值
            scrollTop: 0,
            searchHistory: [], // 搜索历史记录
        };
    },
    computed: {
        ...mapState("goods", {
            counterMap: "counterMap"
        }),
        totalCount() {
            const count = Object.values(this.counterMap).reduce((prev, item) => prev + item, 0);
            return count > 99 ? "99+" : count;
        }
    },
    methods: {
        onSearch(val) {
            this.value = val ? val : (this.value || this.placeholder);

            if (this.searchHistory.includes(this.value)) {
                this.searchHistory.splice(this.searchHistory.indexOf(this.value), 1);
            }
            this.searchHistory.unshift(this.value)

            localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory.slice(0, 10)));
            this.page = 0;
            this.goodsList = [];
            this.finished = false;
            this.onLoad();
        },
        // 输入
        handleInput() {
            this.likeSearchList = [];
            this.debounceLikeSearch();
        },
        // 聚焦
        handleFocus() {
            if (this.changeInput) {
                this.likeSearchList = [];
                this.debounceLikeSearch();
            }
            this.showGoodsList = false;
            this.showLikeSearch = true;
        },
        // 失焦
        handleBlur() {
            setTimeout(() => {
                this.showLikeSearch = false;
                if (this.goodsList.length > 0) {
                    this.showGoodsList = true;
                }
            }, 50);
            this.changeInput = false;
        },
        // 清除输入框
        handleClear() {
            this.goodsList = [];
            this.showHistory = true;
            this.showGoodsList = false;
        },
        // 删除历史记录
        deleteHistory() {
            this.searchHistory = [];
            localStorage.setItem("searchHistory", JSON.stringify([]));
        },
        clickHistory(val) {
            this.onSearch(val);
        },
        async likeSearch() {
            if (!this.value) return;

            const res = await api.likeSearch(this.value);
            this.likeSearchList = res.result.filter(item => item !== this.value);
            console.log(this.likeSearchList);
        },
        async onLoad() {
            this.page += 1;
            this.loading = true;
            const res = await api.search({
                page: this.page,
                size: 10,
                type: this.value,
            });
            this.goodsList = [...this.goodsList, ...res.list];
            console.log(res);
            if (res.total === 0) {
                this.$toast("抱歉！暂时没有该商品")
            } else {
                this.showGoodsList = true;
            }

            if (this.goodsList.length >= res.total) {
                this.finished = true;
            } else {
                this.loading = false;
            }
        },
    },
    watch: {
        value(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.changeInput = true;
            }
        }
    },
    created() {
        // 防抖模糊搜索函数
        this.debounceLikeSearch = debounce(this.likeSearch, 500);

        let searchHistory = localStorage.getItem("searchHistory");
        searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
        this.searchHistory = searchHistory;
    },
};
</script>

<style lang="less" scoped>
.search-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    background-color: #fff;
    transition: box-shadow .3s;
    &.shadow {
        box-shadow: 0px 2px 10px 0px rgba(188, 188, 188, 0.5);
    }
    .arrow-left {
        margin-left: 12px;
        font-size: 20px;
    }
}
.van-search {
    width: 100%;
}
.van-search__action {
    display: flex;
    align-items: center;
    .van-icon {
        font-size: 20px;
        margin-right: 8px;
    }
}
.like-search-list {
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 3;
    box-shadow: 0px 2px 10px 0px rgba(188, 188, 188, 0.5);
}
.goodslist {
    padding: 0 20px;
    position: absolute;
    top: 54px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: auto;
    z-index: 10;
}
.history-wrapper {
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .delete {
        color: #1a73e8;
    }
    .history-list {
        margin-top: 10px;
    }
    .van-button {
        background: #eee;
        border-radius: 5px;
        margin: 0 10px 10px 0;
    }
}
</style>
