import express, { Router } from "express";
import { middleware } from "../Middleware/middleware.js";
import * as roomContrller from "../Controllers/room.Controller.js";
const roomRouter: Router = express.Router();

roomRouter.post("/createRoom", middleware, roomContrller.createRoomController);
roomRouter.get("/getRoom/:roomID", middleware, roomContrller.getRoomcontroller);
roomRouter.get("/findRoom", middleware, roomContrller.searchRoomController);
roomRouter.delete(
  "/deleteRoom/:roomID",
  middleware,
  roomContrller.deleteRoomcontroller
);
export default roomRouter;
