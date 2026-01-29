import express from "express";
import middleware from "../middleware/middleware.js"
import { createThread, getThreads, likeThread, favoriteThread, deleteThread, addReply, getReplies } from "../controllers/controller_threads.js";

const threads_router = express.Router();

threads_router.get("/getThreads", middleware, getThreads);
threads_router.post("/thread", middleware, createThread);
threads_router.post("/thread/:threadId/like", middleware, likeThread);
threads_router.post("/thread/:threadId/favorite", middleware, favoriteThread);
threads_router.delete("/thread/:threadId", middleware, deleteThread);
threads_router.post("/thread/:threadId/replies", middleware, addReply);
threads_router.get("/thread/:threadId/replies", middleware, getReplies);



export default threads_router;   