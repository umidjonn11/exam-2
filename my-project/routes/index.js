import { Router } from "express";
import { authRouter } from "./user.routes.js";
import { PostRouter } from "./post.routes.js";
import { Commentrouter } from "./comment.routes.js";
import { Blogrouter } from "./blog.routes.js";
export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/p", PostRouter);
apiRouter.use("/c", Commentrouter);
apiRouter.use("/b", Blogrouter);
