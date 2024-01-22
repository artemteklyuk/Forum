import axios from "axios";



const $host = axios.create({
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    baseURL: "http://localhost:5000/"
})
const $authHost = axios.create({
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    baseURL: "http://localhost:5000/"
})
const authIntercertion = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}
$authHost.interceptors.request.use(authIntercertion)
$authHost.interceptors.request.use(request => {
    request.maxContentLength = Infinity;
    request.maxBodyLength = Infinity;
    return request;
})
export {
    $host,
    $authHost
}