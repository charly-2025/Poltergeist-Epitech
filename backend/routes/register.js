import express from "express";
import User from "../models/auth.js";
import jwt from 'jsonwebtoken';

const register_router = express.Router();

register_router.post("/register", async (req, res) => {
  try { 
    const ip = req.ip.replace(/^::ffff:/, ''); 
    const user = new User({ 
      created_at: new Date(), 
      ip: ip 
    });   
    await user.save();

    const token = jwt.sign({ userId: user.anonyme_id }, 'secret');   
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });  

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default register_router;   