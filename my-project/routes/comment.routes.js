import express from 'express';
import { commentController } from '../controllers/comment.controller';
import { validateData } from '../middlewares/validation.middleware';
import { commentCreateSchema, commentUpdateSchema } from '../validations';
export const Commentrouter = express.Router();

// Comment routes
router.post('/create',validateData(commentCreateSchema),commentController.create);
router.put('/:commentId/update',validateData(commentUpdateSchema) ,commentController.update);
router.delete('/:commentId/delete', commentController.delete);

