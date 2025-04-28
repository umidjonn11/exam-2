import express from 'express';
import { blogController } from '../controllers/blog.controller.js';
import { validateData } from '../middlewares/validation.middleware.js';
import { blogCreateSchema, blogUpdateSchema } from '../validations/index.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const Blogrouter = express.Router();

// Blog routes
Blogrouter.post('/create/:userId', validateData(blogCreateSchema), blogController.create);  // Create blog
Blogrouter.get('/get-my-blogs/:userId', blogController.getMyBlogs); // Get user's blogs
Blogrouter.get('/get-my-joined-blogs/:userId', blogController.getMyJoinedBlogs); // Get joined blogs
Blogrouter.get('/get-blog-info/:blogId', blogController.getBlogInfo); // Get blog info by ID
Blogrouter.put('/update/:userId/:blogId', validateData(blogUpdateSchema), blogController.update); // Update blog
Blogrouter.delete('/delete/:userId/:blogId', blogController.delete); // Delete blog
Blogrouter.get('/search', blogController.search); // Search blogs by name
Blogrouter.post('/join-blog/:userId/:blogId', blogController.joinBlog); // Join blog
Blogrouter.post('/leave-blog/:userId/:blogId', blogController.leaveBlog); // Leave blog
