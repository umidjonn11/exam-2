import { z } from "zod";

export const customerRegistrationSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  role: z.enum(["user", "admin", "manager"]),
  firstName: z.string(),
  lastName: z.string(),
});

export const customerSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});