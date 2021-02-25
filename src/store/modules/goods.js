import api from "@/api";
import { delay } from "@/utils";

export default {
    namespaced: true,
    state: {
        sideList: [],
        goodsList: {
            list: []
        },
        loadingGoods: false,
        type: ""
    },
    mutations: {
        setSideList(state, payload) {
            state.sideList = payload;
        },
        setGoodsList(state, { type, data }) {
            if (state.type === type) {
                state.goodsList = {
                    total: data.total,
                    list: [...data.list, ...state.goodsList.list]
                };
            } else {
                state.goodsList = data;
            }
            state.type = type;
        },
        setLoadGoodsStatus(state, payload) {
            state.loadingGoods = payload;
        }
    },
    actions: {
        async getSideList({ commit }, type) {
            const res = await api.getSideList(type);
            commit("setSideList", res);
        },
        async getGoodsList({ commit }, params) {
            commit("setLoadGoodsStatus", true);
            const res = await api.getGoodsList(params);
            console.log(res);
            commit("setGoodsList", {
                type: params.type,
                data: res
            });
            await delay(500);
            commit("setLoadGoodsStatus", false);
        }
    },
}