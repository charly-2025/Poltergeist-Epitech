import express from "express";
import middleware from "../middleware/middleware.js"
import { createThread, getThreads } from "../controllers/controller_threads.js";

const threads_router = express.Router();

threads_router.get("/getThreads", middleware, getThreads);
threads_router.post("/thread", middleware, createThread);
threads_router.post("/thread/:threadId/like", middleware, likeThread);

export default threads_router;   