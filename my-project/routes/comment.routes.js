import express from 'express';
import { commentController } from '../controllers/comment.controller.js';
import { validateData } from '../middlewares/validation.middleware.js';
import { commentCreateSchema, commentUpdateSchema } from '../validations/index.js';
export const Commentrouter = express.Router();

// Comment routes
Commentrouter.post('/create',validateData(commentCreateSchema),commentController.create);
Commentrouter.put('/:commentId/update',validateData(commentUpdateSchema) ,commentController.update);
Commentrouter.delete('/:commentId/delete', commentController.delete);

