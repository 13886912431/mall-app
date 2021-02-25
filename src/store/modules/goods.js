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
        counterMap: {}
    },
    mutations: {
        setSideList(state, payload) {
            state.sideList = payload;
        },
        setGoodsList(state, payload) {
            state.goodsList = [...state.goodsList, ...payload];
        },
        resetGoodsList(state) {
            state.goodsList = [];
        },
        setLoadSideStatus(state, payload) {
            state.loadingSide = payload;
        },
        setGoodsListType(state, payload) {
            state.type = payload;
        },
        setGoodsListSort(state, payload) {
            state.sort = payload;
        },
        setCounterMap(state, payload) {
            state.counterMap = payload;
        },
        changeCounterMap(state, { id, count }) {
            if (count === 0) {
                Vue.delete(state.counterMap, id);
            } else {
                Vue.set(state.counterMap, id, count);
            }
            localStorage.setItem("counterMap", JSON.stringify(state.counterMap));            
        }
    },
    actions: {
        // 左侧菜单列表
        async getSideList({ commit }, type) {
            commit("setLoadSideStatus", true);
            const res = await api.getSideList(type);
            commit("setSideList", res);
            await delay(500);
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
            
            res.list.forEach(item => {
                const count = state.counterMap[item.id];
                if (count) {
                    item.buyCount = count;
                } else {
                    item.buyCount = 0;
                }
            })
            console.log(res.list);
            commit("setGoodsList", res.list);
            commit("setGoodsListType", type);
            commit("setGoodsListSort", sort);
            return res.list;
        }
    },
}