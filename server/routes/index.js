import Router from "express";
import userRouter from "./userRouter.js";
import commentsRouter from "./commentsRouter.js";
import postRouter from "./postRouter.js";
import postThemeRouter from "./postThemeRouter.js";

const router = new Router()

router.use("/user", userRouter)
router.use("/comments", commentsRouter)
router.use("/posts", postRouter)
router.use("/themes", postThemeRouter)


export default router