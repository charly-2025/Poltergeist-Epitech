import express from "express";
import { checkAuth } from "../controllers/controller_cookie.js";

const checkAuth_router = express.Router();

checkAuth_router.post("/check", checkAuth);

export default checkAuth_router;   