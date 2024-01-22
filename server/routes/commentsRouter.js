import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import CommentsController from "../controllers/commentsController.js"
const router = new Router()

router.post("/", authMiddleware, CommentsController.create)
router.get("/", CommentsController.getById)
router.delete("/", CommentsController.deleteComment)


export default router