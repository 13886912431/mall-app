import axios from "@/http";

export default {
    getSideList: type => axios.get("/getsidebar", { params: { type } }),
    getGoodsList: params => axios.get("/getGoodsList", { params }),
};
