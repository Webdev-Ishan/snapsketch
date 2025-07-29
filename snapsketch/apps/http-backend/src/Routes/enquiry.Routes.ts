import express, { Router } from "express";
import { middleware } from "../Middleware/middleware.js";
import * as enquiryContrller from "../Controllers/enquiry.Controller.js";
const enquiryRouter: Router = express.Router();

enquiryRouter.post(
  "/ask",
  middleware,
  enquiryContrller.createEnquiryController
);

export default enquiryRouter;
