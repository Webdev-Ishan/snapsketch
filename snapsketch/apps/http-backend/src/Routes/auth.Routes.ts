import express, { Router } from "express";
import * as authController from "../Controllers/auth.Controller.js";
import { middleware } from "../Middleware/middleware.js";

const authRouter: Router = express.Router();

authRouter.post("/signup", authController.signUpcontroller);
authRouter.post("/signin", authController.signinController);
authRouter.get("/profile", middleware, authController.signinController);
export default authRouter;
