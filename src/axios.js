import axios from "axios";

const instance = axios.create({
    baseURL: "https://blog-e754.onrender.com"
    // baseURL: "http://localhost:3000/"

    
})
instance.interceptors.request.use((config)=> {
    config.headers.Authorization = window.localStorage.getItem("token")
    return config
})
export default instance