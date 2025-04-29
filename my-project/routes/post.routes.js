import express from "express";
import { postController } from "../controllers/post.controller.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { postCreateSchema, postUpdateSchema } from "../validations/index.js";

export const PostRouter = express.Router();

// Post Routes
PostRouter.post("/create/:userId/:blogId", validateData(postCreateSchema), postController.create);
PostRouter.get("/get-all/:blogId", postController.getAll);
PostRouter.get("/post/:postId", postController.getById);
PostRouter.put("/update/:userId/:postId", validateData(postUpdateSchema), postController.update);
PostRouter.delete("/delete/:userId/:postId", postController.delete);
PostRouter.get("/sort-by-date/:blogId", postController.sortByDate);

