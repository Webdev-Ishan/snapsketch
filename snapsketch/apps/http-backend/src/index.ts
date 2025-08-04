import express from "express";

import authRouter from "./Routes/auth.Routes.js";
import cors from "cors";
import roomRouter from "./Routes/room.Routes.js";
import reviewRouter from "./Routes/review.Routes.js";
import enquiryRouter from "./Routes/enquiry.Routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://snapsketch.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use("/api/auth", authRouter);

app.use("/api/room", roomRouter);
app.use("/api/review", reviewRouter);
app.use("/api/enquiry", enquiryRouter);
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
