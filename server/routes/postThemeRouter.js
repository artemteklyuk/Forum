import Router from "express";
import PostThemeController from "../controllers/postThemeController.js"
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router()

router.post("/")
router.get("/",authMiddleware, PostThemeController.getAll)
router.get("/:id")


export default router