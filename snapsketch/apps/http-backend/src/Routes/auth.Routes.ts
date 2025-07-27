import express, { Router } from 'express';
import *as authController from '../Controllers/auth.Controller.js'

const authRouter:Router = express.Router();

authRouter.post("/signup",authController.signUpcontroller);

export default authRouter;