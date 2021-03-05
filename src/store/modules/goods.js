import Vue from "vue";
import api from "@/api";
import { delay } from "@/utils";

export default {
    namespaced: true,
    state: {
        sideList: [],
        goodsList: [],
        loadingSide: false,
        type: null,
        limit: 10,
        sort: "all",
        counterMap: {},
    },
    mutations: {
        // 设置侧边菜单列表
        setSideList(state, payload) {
            state.sideList = payload;
        },
        // 设置商品列表
        setGoodsList(state, payload) {
            state.goodsList = [...state.goodsList, ...payload];
        },
        // 重置商品列表
        resetGoodsList(state) {
            state.goodsList = [];
        },
        // 设置加载侧边菜单列表状态
        setLoadSideStatus(state, payload) {
            state.loadingSide = payload;
        },
        // 设置商品列表类型
        setGoodsListType(state, payload) {
            state.type = payload;
        },
        // 设置商品列表排序方式
        setGoodsListSort(state, payload) {
            state.sort = payload;
        },
        // 设置商品id与购物车数量映射关系
        setCounterMap(state, payload) {
            state.counterMap = payload;
        },
        // 改变商品id与购物车数量映射关系
        changeCounterMap(state, { id, count }) {
            (count <= 0 || !count) ? Vue.delete(state.counterMap, id) : Vue.set(state.counterMap, id, count);
            localStorage.setItem("counterMap", JSON.stringify(state.counterMap));            
        },
    },
    actions: {
        // 左侧菜单列表
        async getSideList({ commit }, type) {
            commit("setLoadSideStatus", true);
            const res = await api.getSideList(type);
            commit("setSideList", res);
            await delay(100);
            commit("setLoadSideStatus", false);
        },
        // 商品列表
        async getGoodsList({ commit, state }, parasm) {
            let { type, page, sort } = parasm;
            type = type || state.type;
            sort = sort || state.sort;
            const res = await api.getGoodsList({
                size: state.limit, 
                page,
                type,
                sort
            });
            commit("setGoodsList", res.list);
            commit("setGoodsListType", type);
            commit("setGoodsListSort", sort);
            return res.list;
        }
    },
}