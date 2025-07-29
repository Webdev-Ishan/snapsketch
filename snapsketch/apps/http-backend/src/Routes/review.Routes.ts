import express, { Router } from "express";
import { middleware } from "../Middleware/middleware.js";
import * as reviewContrller from "../Controllers/review.Controller.js";
const reviewRouter: Router = express.Router();

reviewRouter.post(
  "/createRoom",
  middleware,
  reviewContrller.createReviewController
);

export default reviewRouter;
