import express from "express";
import User from "../models/auth.js";
import jwt from 'jsonwebtoken';
import { Register } from "../controllers/controllers.js";

const register_router = express.Router();

register_router.post("/register", Register);

export default register_router;   