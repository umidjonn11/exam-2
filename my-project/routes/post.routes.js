import express from "express";
import { postController } from "../controllers/post.controller.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { postCreateSchema, postUpdateSchema } from "../validations/index.js";

export const PostRouter = express.Router();

// Post Routes
PostRouter.post("/:userId/:blogId/create", validateData(postCreateSchema), postController.create);
PostRouter.get("/:blogId/get-all", postController.getAll);
PostRouter.get("/:postId", postController.getById);
PostRouter.put("/:userId/:postId/update", validateData(postUpdateSchema), postController.update);
PostRouter.delete("/:userId/:postId/delete", postController.delete);
PostRouter.get("/:blogId/sort-by-date", postController.sortByDate);
