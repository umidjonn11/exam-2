import { Router } from "express";
import { authController } from "../controllers/index.js";
import { customerSigninSchema, customerRegistrationSchema,} from "../validations/index.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/role.middleware.js";

export const authRouter = Router();

authRouter.post("/signup", validateData(customerRegistrationSchema), authController.register,);
authRouter.post("/signin", validateData(customerSigninSchema), authController.login);
authRouter.get("/logout", authController.logout);
// authRouter.post("/verify", authController.verify);
authRouter.get("/me", authMiddleware, authController.profile);
authRouter.delete("/delete/:id",authMiddleware,roleGuard("manager"),authController.delete)