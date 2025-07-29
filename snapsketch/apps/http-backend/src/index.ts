import express from "express";

import authRouter from "./Routes/auth.Routes.js";
import cors from "cors";
import roomRouter from "./Routes/room.Routes.js";
import reviewRouter from "./Routes/review.Routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);

app.use("/api/room", roomRouter);
app.use("/api/review", reviewRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
