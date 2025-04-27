// validations/blog.validation.js
import { z } from "zod";

export const blogCreateSchema = z.object({
  name: z.string().min(3, "Blog name must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
});

export const blogUpdateSchema = z.object({
  name: z.string().min(3, "Blog name must be at least 3 characters long").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .optional(),
});
