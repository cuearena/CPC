import axios from "axios";
import { clearStorage } from "./localStroage";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    (config) => {
        var baseURI = import.meta.env.VITE_BASE_URI;
        if (config.url) config.url = `${baseURI}${config.url[0]!=="//" ? config.url : `/${config.url}`}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;