import express from 'express';
import { blogController } from '../controllers/blog.controller';
import { validateData } from '../middlewares/validation.middleware';
import { blogCreateSchema, blogUpdateSchema } from '../validations';

export const Blogrouter = express.Router();

// Blog routes
router.post('/create',validateData(blogCreateSchema), blogController.create);
router.get('/get-my-blogs', blogController.getMyBlogs);
router.get('/get-my-joined-blogs', blogController.getMyJoinedBlogs);
router.get('/get-blog-info/:blogId', blogController.getBlogInfo);
router.put('/update/:blogId',validateData(blogUpdateSchema), blogController.update);
router.delete('/delete/:blogId', blogController.delete);
router.get('/search', blogController.search);
router.post('/join-blog/:blogId', blogController.joinBlog);
router.post('/leave-blog/:blogId', blogController.leaveBlog);

