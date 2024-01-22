import {$authHost, $host} from "./index";

export default class UserService {
    static async createTheme(theme) {
        const {data} = await $authHost.post("api/themes", theme)
        return data

    }

    static async fetchThemes() {
        const {data} = await $authHost.get("api/themes")
        return data
    }

    static async createPost(title, theme, body) {
        const {data} = await $authHost.post("api/posts", {
            title: title,
            theme: theme,
            body: body
        })
        return data
    }
    static async deletePost(id){
        const res = await $authHost.delete(`api/posts?id=${id}`)
        return res
    }

    static async fetchPosts(page, limit = 5) {
        const {data} = await $host.get("api/posts", {
            params: {
                page, limit
            }
        })
        return data
    }

    static async fetchOnePost(id) {
        const {data} = await $host.get("api/posts/" + id)
        return data

    }

    static async createComment(body, postId) {
        const {data} = await $authHost.post("api/comments", {body, postId})
        return data
    }

    static async fetchCommentsById(postId) {
        const {data} = await $host.get("api/comments", {
            params: {postId}
        })
        return data
    }
    static async deleteCommentsByPostId(postId){
        const res = await $authHost.delete(`api/comments`, {
            params: {postId}
        })
        return res
    }
}