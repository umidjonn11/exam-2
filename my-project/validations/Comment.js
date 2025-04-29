import { z } from "zod";

export const commentCreateSchema = z.object({
  content: z.string().min(3, "Comment must be at least 3 characters long"),
});

export const commentUpdateSchema = z.object({
  content: z.string().min(3, "Comment must be at least 3 characters long"),
});
