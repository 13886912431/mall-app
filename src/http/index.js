import axios from "axios";

const baseURL = "https://mallapi.duyiedu.com/goods/";
const appkey = "serein_1608558115171";

const instance = axios.create({
    baseURL,
    params: {
        appkey
    },
    timeout: 10000,
});

instance.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data;
    }
    return response;
}, error => Promise.reject(error));

export default instance;
