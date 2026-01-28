import express from "express";
import middleware from "../middleware/middleware.js"
import { getUserInfos } from "../controllers/controller_user.js";

const user_router = express.Router();

user_router.get("/getUserInfos", middleware, getUserInfos);

export default user_router;   