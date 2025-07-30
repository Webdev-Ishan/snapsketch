import express, { Router } from "express";
import * as authController from "../Controllers/auth.Controller.js";
import { middleware } from "../Middleware/middleware.js";
import multer from "../Middleware/multer.js";
const authRouter: Router = express.Router();

authRouter.post(
  "/signup",
  multer.single("profilepic"),
  authController.signUpcontroller
);
authRouter.post("/signin", authController.signinController);
authRouter.get("/profile", middleware, authController.ProfileController);
authRouter.put(
  "/profile",
  middleware,
  multer.single("profilepic"),
  authController.editProfileController
);
export default authRouter;
