import {Comments, Post} from "../models/models.js"

class CommentsController {
    async create(req, res) {
        try {
            let {body, postId} = req.body
            let userId = req.user.id
            const comment = await Comments.create(
                {
                    body: body,
                    UserId: userId,
                    PostId: postId
                })
            return res.json(comment)
        } catch (e) {
            res.status(500).json({message: "Ошибка при созданиие комментария"})
        }
    }
    async getById(req, res) {
        const {postId} = req.query
        const comments = await Comments.findAll({
            where: {PostId: postId}
        })
        res.json(comments)
    }
    async deleteComment(req, res) {
        const {postId} = req.query
        await Comments.findAll({ where: {PostId: postId} })
            .then(records => {
                records.forEach(record => record.destroy())
            })
        res.json({message: "comments was deleted"})
    }
}

export default new CommentsController()