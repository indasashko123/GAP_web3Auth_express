import {Router} from "express";
import { userController } from "@controllers";
import { authMiddleware } from "@middlewares";
export const router : Router =  Router();

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

router.get("/users",authMiddleware, userController.getUsers);   