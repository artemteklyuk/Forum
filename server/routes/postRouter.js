import Router from "express";
import postController from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router()

router.post("/", authMiddleware, postController.create)
router.get("/", postController.getAll)
router.get("/:id", postController.getOne)
router.delete("/", postController.delete)



export default router