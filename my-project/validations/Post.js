// validations/post.validation.js
import { z } from "zod";

export const postCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long"),
  blogId: z.string().min(24, "Invalid Blog ID format").max(24),  // Assuming MongoDB ObjectId
});

export const postUpdateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .optional(),
});

export const postCommentSchema = z.object({
  postId: z.string().min(24, "Invalid Post ID format").max(24),
  content: z.string().min(3, "Comment must be at least 3 characters long"),
});
