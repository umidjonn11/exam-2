import express from 'express';
import { postController } from '../controllers/post.controller.js';
import { validateData } from '../middlewares/validation.middleware.js';
import { postCommentSchema, postCreateSchema, postUpdateSchema } from '../validations/index.js';

export const Postrouter = express.Router();

// Post routes
Postrouter.post('/create',validateData(postCreateSchema), postController.create);
Postrouter.get('/get-all/:blogId', postController.getAll);
Postrouter.get('/:postId', postController.getById);
Postrouter.put('/:postId/update', validateData(postUpdateSchema),postController.update);
Postrouter.delete('/:postId/delete', postController.delete);
Postrouter.get('/:blogId/sort-by-date', postController.sortByDate);
// Postrouter.get('/:postId/get-comments',validateData(postCommentSchema) ,postController.getComments);

