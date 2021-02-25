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
        sort: "all"
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
            console.log(res);
            
            commit("setGoodsList", res.list);
            commit("setGoodsListType", type);
            commit("setGoodsListSort", sort);
            return res.list;
        }
    },
}