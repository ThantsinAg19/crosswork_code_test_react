import axios from 'axios';

const {
    REACT_APP_BASE_URL,
    REACT_APP_AUTH_USERNAME,
    REACT_APP_AUTH_PASSWORD
} = process.env

const axiosInstance = axios.create({
    baseURL: REACT_APP_BASE_URL,
    timeout: 10000
})

axiosInstance.interceptors.request.use(config => {
    config.auth = {
        username: REACT_APP_AUTH_USERNAME,
        password: REACT_APP_AUTH_PASSWORD
    }

    return config;
})

export default axiosInstance;