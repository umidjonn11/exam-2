import express from 'express';
import { commentController } from '../controllers/comment.controller.js';
import { validateData } from '../middlewares/validation.middleware.js';
import { commentCreateSchema, commentUpdateSchema } from '../validations/index.js';

export const Commentrouter = express.Router();

Commentrouter.post('/:userId/:postId/create', 
  validateData(commentCreateSchema), 
  commentController.create
);

Commentrouter.put('/:userId/:commentId/update', 
  validateData(commentUpdateSchema), 
  commentController.update
);

Commentrouter.delete('/:userId/:commentId/delete', 
  commentController.delete
);
