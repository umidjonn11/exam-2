import { Router } from "express";
import { authRouter } from "./user.routes.js";
import { Postrouter } from "./post.routes.js";
import { Commentrouter } from "./comment.routes.js";
import { Blogrouter } from "./blog.routes.js";
export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/", Postrouter);
apiRouter.use("/", Commentrouter);
apiRouter.use("/", Blogrouter);
