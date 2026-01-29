import express from "express";
import middleware from "../middleware/middleware.js"
import { getUserInfos , UpdateLocation, getUserThreads } from "../controllers/controller_user.js";

const user_router = express.Router();

user_router.get("/getUserInfos", middleware, getUserInfos);
user_router.patch("/updateLocation", middleware, UpdateLocation)
user_router.get("/getUserThreads", middleware, getUserThreads)

export default user_router;   