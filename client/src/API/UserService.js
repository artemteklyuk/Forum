import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
export default class UserService {
    static async registration(email, password) {
        const res = await $host.post(`api/user/registration`, {
            email,
            password
        })
        localStorage.setItem("token", res.data.token)
        return jwtDecode(res.data.token)
    }

    static async login(email, password) {
        const res = await $host.post(`api/user/login`, {
            email,
            password
        })
        localStorage.setItem("token", res.data.token)
        return jwtDecode(res.data.token)
    }

    static async check() {
        try {
            const res = await $authHost.get("api/user/auth",
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
            localStorage.setItem("token", res.data.token)
            return jwtDecode(res.data.token)
        } catch (e) {
            localStorage.removeItem("token")
            return e.response.data.message
        }

    }
}