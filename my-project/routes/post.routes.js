import express from 'express';
import { postController } from '../controllers/post.controller';
import { validateData } from '../middlewares/validation.middleware';
import { postCommentSchema, postCreateSchema, postUpdateSchema } from '../validations/index.js';

export const Postrouter = express.Router();

// Post routes
router.post('/create',validateData(postCreateSchema), postController.create);
router.get('/get-all/:blogId', postController.getAll);
router.get('/:postId', postController.getById);
router.put('/:postId/update', validateData(postUpdateSchema),postController.update);
router.delete('/:postId/delete', postController.delete);
router.get('/:blogId/sort-by-date', postController.sortByDate);
router.get('/:postId/get-comments',validateData(postCommentSchema) ,postController.getComments);

