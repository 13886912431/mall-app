import axios from "@/http";

export default {
    getSideList: type => axios.get("/getsidebar", { params: { type } }),
    getGoodsList: params => axios.get("/getGoodsList", { params }),
    getGoodsByIds: params => axios.get("/getGoodsByIds", { params }),
    likeSearch: likeValue => axios.get("/likeSearch", { params: { likeValue } }),
    search: params => axios.get("/search", { params }),
};
