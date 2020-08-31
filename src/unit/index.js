import axios from "axios";
// axios.defaults.baseURL = "http://10.36.149.34:8080";
// axios.defaults.baseURL = "http://42.194.186.54:8080";
axios.defaults.baseURL = "http://106.55.9.181:8080";

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // 只获取 返回数据中的 data  部分
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 导出自定义的axios
export default axios;
