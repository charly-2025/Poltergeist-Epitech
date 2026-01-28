import express from "express";
import { Register } from "../controllers/controller_user.js";

const register_router = express.Router();

register_router.post("/register", Register);

export default register_router;   