import express from "express";
import middleware from "../middleware/middleware.js"
import { createThread, getRecentsThreads } from "../controllers/controllers.js";

const threads_router = express.Router();

threads_router.get("/recents", middleware, getRecentsThreads);
threads_router.post("/thread", middleware, createThread);

export default threads_router;   