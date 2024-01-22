import "../models/models.js"
import {Post, PostTheme, User} from "../models/models.js";

class PostController {
    async create(req, res) {
        try {
            let {title, body, theme} = req.body
            let UserId = req.user.id
            let ThemeId
            const candidateTheme = await PostTheme.findOne(
                {
                    where: {name: theme}
                })
            if (candidateTheme) {
                ThemeId = candidateTheme.id
            }
            else {
                const postTheme = await PostTheme.create({name: theme})
                ThemeId = postTheme.id
            }
            const post = await Post.create(
                {
                    title: title,
                    body: body,
                    UserId: UserId,
                    PostThemeId: ThemeId
                })
            return res.json(post)
        } catch (e) {
            return e.response.data.message
        }
    }

    async getAll(req, res) {
        const posts = await Post.findAll()
        res.json(posts)
    }

    async getOne(req, res) {
        const id = req.params.id
        console.log(req)
        const post = await Post.findOne({
            where: {id}
        })
        res.json(post)
    }

    async delete(req, res) {
        const {id} = req.query
        console.log(req)
        await Post.destroy({
            where: {id}
        })
        res.json({message: "post was deleted"})
    }
}

export default new PostController()