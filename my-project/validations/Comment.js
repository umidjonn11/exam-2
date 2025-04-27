// validations/comment.validation.js
import { z } from "zod";

export const commentCreateSchema = z.object({
  content: z.string().min(3, "Comment must be at least 3 characters long"),
  postId: z.string().min(24, "Invalid Post ID format").max(24),
});

export const commentUpdateSchema = z.object({
  content: z.string().min(3, "Comment must be at least 3 characters long"),
});
