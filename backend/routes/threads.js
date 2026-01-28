import express from "express";
import middleware from "../middleware/middleware.js"
import { createThread, getThreads } from "../controllers/controllers.js";

const threads_router = express.Router();

threads_router.get("/getThread", middleware, getThreads);
threads_router.post("/thread", middleware, createThread);

export default threads_router;   